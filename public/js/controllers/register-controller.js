angular.module('RegisterController',['AuthService'])

.controller('registerController', ['$scope', '$state', 'authService',
function($scope, $state, authService) {

    $scope.user = {};

    $scope.register = function(){ 
        if($scope.user.password !== $scope.repeatedPassword) {
            prompt('Passwords do not match (please make this not a modal soon kevin)')
            return;
        }

        authService.register($scope.user)
        .then(function() {
            return authService.login($scope.user);
        })
        .then(function() {
            $state.go('home');
        });
    };
}]);
