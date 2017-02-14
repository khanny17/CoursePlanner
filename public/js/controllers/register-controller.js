angular.module('RegisterController',['AuthService', 'SchoolService'])

.controller('registerController', ['$scope', '$state', 'authService', 'schoolService',
function($scope, $state, authService, schoolService) {

    $scope.user = {};

    schoolService.getSchools()
    .then(function(schools) {
        $scope.schools = schools;
    });

    $scope.register = function(){ 
        if($scope.user.password !== $scope.repeatedPassword) {
            prompt('Passwords do not match (please make this not a popup soon kevin)')
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
