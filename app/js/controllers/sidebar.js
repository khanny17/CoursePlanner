angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Plans) {
  $scope.title = "Sidebar";
  
  Plans.get().success(function(data) {
    console.log("Get Success");
    $scope.plans = data;
  });

  $scope.serverSave = function() {
    Plans.create(prompt("Title for your plan?"),$scope.years)
      .success(function(data) {
        console.log("Post Success");
        console.log(data);
        $scope.plans = data;
        console.log("plans:");
        console.log($scope.plans);
      });  
  };
});

