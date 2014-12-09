angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Plans,$rootScope) {
  $scope.title = "Sidebar";

  Plans.get().success(function(data) {
    $scope.plans = data;
  });

  $scope.serverSave = function() {
    var myScope = $scope;
    Plans.create(prompt("Title for your plan?"),$scope.years,$rootScope.user.local.username)
      .success(function(data) {
        console.log("Post Success");
        myScope.plans = data;
      });
  };
});
