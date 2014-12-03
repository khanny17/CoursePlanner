angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Plans) {
  $scope.title = "Sidebar";
  
  Plans.get().success(function(data) {
    console.log("Get Success");
    $scope.plans = data;
  });

  $scope.serverSave = function() {
    var myScope = $scope;
    Plans.create(prompt("Title for your plan?"),$scope.years)
      .success(function(data) {
        console.log("Post Success");
        myScope.plans = data;
      });  
  };
});

