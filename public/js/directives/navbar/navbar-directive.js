angular.module('NavbarDirective',[
    'ui.bootstrap', 
    'PlanService', 
    'AuthService', 
    'SchoolService', 
    'OpenPlanModalService',
    'EditColorschemeModal'
])

.directive('navbar', [
    '$http', 
    '$uibModal', 
    'planService', 
    'authService', 
    'openPlanModal', 
    'editColorschemeModal',
    function($http, $uibModal, planService, authService, openPlanModal, editColorschemeModal) {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'js/directives/navbar/navbar-directive.html',
            link: function(scope) {
                scope.isAuthenticated = authService.isAuthenticated;

                scope.getAuthedUser = authService.authenticatedUser;

                scope.logout = function() {
                    //Clear current plan, log em out, and boot em!
                    planService.makeNew();
                    authService.logout();
                };

                scope.login = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'js/directives/navbar/navbar-login-modal.html',
                        animation: false,
                        backdrop: false,
                        size: 'sm',
                        controller: ['$scope', function(modalScope) {
                            modalScope.user = {};

                            modalScope.login = function(){
                                authService.login(modalScope.user)
                                    .then(function(){
                                        modalInstance.close();  
                                    });
                            };

                            modalScope.cancel = function(){
                                modalInstance.close();
                            };
                        }]
                    });
                };

                scope.register = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'js/directives/navbar/navbar-register-modal.html',
                        animation: false,
                        backdrop: false,
                        size: 'sm',
                        controller: ['$scope', 'schoolService', function(modalScope, schoolService) {
                            modalScope.user = {};

                            schoolService.getSchools()
                                .then(function(schools) {
                                    modalScope.schools = schools;
                                });

                            modalScope.register = function(){
                                authService.register(modalScope.user)
                                    .then(function(){
                                        return authService.login(modalScope.user);
                                    })
                                    .then(function(){
                                        modalInstance.close();  
                                    });
                            };

                            modalScope.cancel = function(){
                                modalInstance.close();
                            };
                        }]
                    });
                };

                scope.togglePublic = function() {
                    planService.setPublic(!planService.plan.public);
                };

                scope.isPublic = function() {
                    return planService.plan.public;
                };

                scope.newPlan = planService.makeNew;

                scope.savePlan = planService.save;

                //Let user open one of their own plans
                scope.openPlan = function() {
                    planService.getMine()
                    .then(function(plans) {
                        openPlanModal.open('Open Plan', plans, function(plan) {
                            if(!plan) {
                                return console.log('No plan given to load');
                            }
                            return planService.load(plan);
                        });
                    });
                };

                scope.help = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/help_modal.html',
                        animation: false,
                        backdrop: false,
                        controller: ['$scope', function(modalScope){
                            modalScope.close = modalInstance.close;
                        }]
                    });
                };

                //Open a modal that lets users browse and open public plans
                scope.viewPublicPlans = function() {
                    planService.getPublic()
                    .then(function(plans) {
                        openPlanModal.open('Browse Public Plans', plans, function(plan) {
                            if(!plan) {
                                return console.log('No plan given to load');
                            }

                            return planService.copyPublicPlan(plan);
                        });
                    });
                };

                scope.download = planService.downloadPDF;

                scope.editColorscheme = function() {
                    editColorschemeModal.open(planService.plan.colorscheme);
                };
            }
        };
    }]);

