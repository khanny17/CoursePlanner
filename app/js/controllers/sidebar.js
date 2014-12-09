angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Plans,$rootScope) {
  $scope.title = "Sidebar";

  Plans.get().success(function(data) {
    $scope.plans = data;
  });
});
