angular.module('sidebarController',[])

.controller('sidebarCtrl',function($filter,$scope,$http,Courses,$rootScope) {
  $scope.title = "Courses";
  $scope.query = "";
  $scope.allcourses = {};
  //for the double column display
  $scope.evencourses = [];
  $scope.oddcourses = [];

  //Update list from query
  $scope.$watch(
    //Watch the query
    function(scope) {
      return scope.query;
    },
    //hide div when view is empty
    function(newValue, oldValue) {
      var data = $filter('courseSearch')($scope.allcourses,newValue);
      //rest lists
      $scope.evencourses = [];
      $scope.oddcourses = [];
      //loop through alternating back and forth
      for(var i = 0; i < data.length; ++i) {
        i%2===0 ? $scope.evencourses.push(data[i]) :
                  $scope.oddcourses.push(data[i]);
      }
    }
  );

  Courses.get().success(function(data) {
    data = $filter('orderBy')(data, 'dept',false);
    $scope.allcourses = data;
    //reset lists just in case
    $scope.evencourses = [];
    $scope.oddcourses = [];
    var item;
    for(var i = 0; i < data.length; ++i) {
      item = data[i];
      if(i%2==0)
        $scope.evencourses.push(item);
      else
        $scope.oddcourses.push(item);
    }
  });

  $scope.create = function(c) {
    Courses.create(c.name,c.dept,c.num,c.credits,c.details,c.status).success(function(data) {
      $scope.courses = data;
    }).error(function(err) {
      alert("Course rejected:\n" + err.errors.details.type + ": " + err.errors.details.value);
    });
  };


  $scope.evenEmpty = function() {
    return $scope.evencourses.length <= 0;
  };

  $scope.oddEmpty = function() {
    return $scope.oddcourses.length <= 0;
  };
});
