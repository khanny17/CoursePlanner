angular.module('sidebarController',[])

.controller('sidebarCtrl',function($scope,$http,Courses,$rootScope) {
  $scope.title = "Courses";

  Courses.get().success(function(data) {
    $scope.courses = data;
    console.log(data);
  });

  $scope.create = function() {
    Courses.create(prompt("name"),prompt("dept"),prompt("num"),prompt("cred"),
                   prompt("details"),prompt("status")).success(function(data) {
      $scope.courses = data;
    }).error(function(err) {
      console.log(err);
    });
  };
});
