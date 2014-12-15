angular.module('sidebarController',[])

.controller('sidebarCtrl',function($filter,$scope,$http,Courses,$rootScope) {
  $scope.title = "Courses";
  $scope.query = "";
  $scope.allcourses = {};
  $scope.courses = {};

  //Update list from query
  $scope.$watch(
    //Watch the query
    function(scope) {
      return scope.query;
    },
    //hide div when view is empty
    function(newValue, oldValue) {
      $scope.courses = $filter('filter')($scope.allcourses,newValue);
    }
  );

  Courses.get().success(function(data) {
    data = $filter('orderBy')(data, 'dept',false);
    $scope.allcourses = data;
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
