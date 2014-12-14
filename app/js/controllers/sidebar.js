angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Courses,$rootScope) {
  $scope.title = "Courses";

  Courses.get().success(function(data) {
    $scope.courses = data;
  });

  $scope.create = function(c) {
    Courses.create(c.name,c.dept,c.num,c.credits,c.details,c.status).success(function(data) {
      $scope.courses = data;
    }).error(function(err) {
      alert("Course rejected:\n" + err.errors.details.type + ": " + err.errors.details.value);
    });
  };
});
