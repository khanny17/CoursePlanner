angular.module('NavbarController',['PlanService'])

.controller('navCtrl', ['$scope', '$http', 'planService', '$rootScope',
function($scope, $http, planService, $rootScope) {

    $scope.savePlan = function() {
        planService.create($scope.title, $scope.years)
        .success(function(data) {
            console.log('Plan Saved', data);
        });
    };

}]);
