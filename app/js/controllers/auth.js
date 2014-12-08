angular.module('authController',[])

.controller('authCtrl',function($scope,$rootScope,$http) {
  $scope.username = "";
  $scope.password = "";
  $scope.error = "";

  $scope.login = function() {
    $http.post('/login', {
      username: $scope.username,
      password: $scope.password,
    })
    .success(function(user) {
      $rootScope.user = user;
      $scope.error = "";
    })
    .error(function() {
      $scope.error = "Username or Password Incorrect";
    });
  };

  $scope.signup = function() {
    $http.post('/signup', {
      username: $scope.username,
      password: $scope.password,
    })
    .success(function(user) {
      $rootScope.user = user;
      $scope.error = "";
    })
    .error(function() {
      $scope.error = "Username already taken";
    });
  };
});
