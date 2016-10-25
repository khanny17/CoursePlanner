angular.module('LandingController',['AuthService'])

.controller('landingController', ['$scope', '$state', 'authService', function($scope, $state, authService) {
    
    $scope.user = {};

    $scope.login = function() {
        authService.login($scope.user)
        .then(function(response){
            $state.go('home');
        }, function(err){
            console.log(err);
        });
    };

    $scope.register = function() {
        authService.register($scope.user)
        .then(function(response){
            $state.go('home');
        }, function(err) {
            console.log(err);
        });
    };
}]);
