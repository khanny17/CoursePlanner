angular.module('RegisterController',['AuthService', 'SchoolService'])

.controller('registerController', ['$scope', '$state', 'authService', 'schoolService',
function($scope, $state, authService, schoolService) {

    $scope.user = {};

    schoolService.getSchools()
    .then(function(schools) {
        $scope.schools = schools;
    });

    var missingFields = function(user) {
        return !user.school || !user.username || !user.password || !user.repeatedPassword;
    };

    $scope.register = function(){ 
        if(missingFields($scope.user)) {
            alert('Missing Fields');
            return;
        }

        if($scope.user.password !== $scope.user.repeatedPassword) {
            alert('Passwords do not match (please make this not a popup soon kevin)');
            return;
        }

        $scope.user.school = $scope.user.school._id;
        authService.register($scope.user)
        .then(function() {
            return authService.login($scope.user);
        })
        .then(function() {
            $state.go('home');
        });
    };
}]);
