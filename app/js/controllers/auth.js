angular.module('authController',[])

.controller('authCtrl',function($scope,$rootScope,$http) {
  $scope.username = "";
  $scope.password = "";

  $scope.login = function() {
    $http.post('/login', {
      username: $scope.username,
      password: $scope.password,
    })
    .success(function(user) {
      $rootScope.user = user;
    })
    .error(function() {
      $rootScope.error = "Username or Password Incorrect";
    });
  };

  $scope.signup = function() {
    $http.post('/signup', {
      username: $scope.username,
      password: $scope.password,
    })
    .success(function(user) {
      $rootScope.user = user;
    })
    .error(function() {
      $rootScope.error = "Username already taken";
    });
  };
});
