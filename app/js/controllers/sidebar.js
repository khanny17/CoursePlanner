angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Courses,$rootScope) {
  $scope.title = "Sidebar";

  Courses.get().success(function(data) {
    $scope.courses = data;
  });
});
