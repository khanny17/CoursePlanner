angular.module('NavbarDirective',['ui.bootstrap', 'PlanService', 'AuthService', 'SchoolService'])

.directive('navbar', ['$http', '$uibModal', 'planService', 'authService',
function($http, $uibModal, planService, authService) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'js/directives/navbar/navbar-directive.html',
        link: function(scope) {
            scope.isAuthenticated = authService.isAuthenticated;

            scope.getAuthedUser = authService.authenticatedUser;
            
            scope.logout = function() {
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
                planService.plan.public = !planService.plan.public;
            };

            scope.isPublic = function() {
                return planService.plan.public;
            };

            scope.newPlan = planService.makeNew;

            scope.savePlan = planService.save;

            scope.openPlan = function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'js/directives/navbar/navbar-open-plan-modal.html',
                    animation: false,
                    backdrop: false,
                    size: 'sm',
                    controller: ['$scope', function(modalScope) {
                        planService.getMine()
                        .then(function(plans) {
                            modalScope.selectedPlan = null;
                            modalScope.plans = plans;
                        });

                        modalScope.selected = function(plan){
                            modalScope.selectedPlan = plan;
                        };

                        modalScope.open = function() {
                            if(!modalScope.selectedPlan) {
                                return console.log('HOW?');
                            }
                            planService.load(modalScope.selectedPlan)
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
        }
    };
}]);

