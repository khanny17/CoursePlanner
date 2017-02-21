var app = angular.module("HomeController", ['PlanService', 'NotificationService']);

app.controller('homeController', ['$scope','$http', 'planService', 'notificationService',
function($scope, $http, planService, notificationService) {
    
    $scope.plan = planService.plan;
    notificationService.on('plan-changed', function(){
        $scope.plan = planService.plan;
    });

    $scope.errormsg = "";
    $scope.setErrorMsg = function(text) {
        $scope.errormsg = text;
    };

}]);
