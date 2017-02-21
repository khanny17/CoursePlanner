angular.module('OpenPlanModalService', ['ui.bootstrap'])

.service('openPlanModal', ['$uibModal', function($uibModal) {
    var self = this;

    self.open = function(title, plans, openFn) {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/modals/open-plan/open-plan-modal.html',
            animation: false,
            backdrop: false,
            size: 'lg',
            controller: ['$scope', function(modalScope) {
                modalScope.title = title;
                modalScope.query = {};
                modalScope.selectedPlan = null;
                modalScope.plans = plans;

                modalScope.selected = function(plan){
                    modalScope.selectedPlan = plan;
                };

                modalScope.open = function() {
                    openFn(modalScope.selectedPlan)
                    .then(function() {
                        modalInstance.close();
                    });
                };

                modalScope.cancel = function(){
                    modalInstance.close();
                };
            }]
        });
    };
}]);
