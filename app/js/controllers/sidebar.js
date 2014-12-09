angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Plans,$rootScope) {
  $scope.title = "Sidebar";

  Plans.get().success(function(data) {
    $scope.plans = data;
  });

  $scope.serverSave = function() {
    var myScope = $scope;
    Plans.create($scope.title,$scope.years,$rootScope.user.local.username)
    .success(function(data) {
      myScope.plans = data;
    });
  };
});
