angular.module('LandingController',['AuthService'])

    .controller('landingController', ['$scope', '$state', 'authService', function($scope, $state, authService) {

        $scope.user = {};
        $scope.errors = {};
        $scope.errorMessage = '';

        $scope.login = function() {
            authService.login($scope.user)
                .then(function(response){
                    $state.go('home');
                }, handleError);
        };

        $scope.register = function() {
            authService.register($scope.user)
                .then(function(response){
                    $state.go('home');
                }, handleError);
        };

        //Helper function that logs error, shows error, and sets fields as errored
        function handleError(err) {
            console.log(err.msg);
            $scope.errorMessage = err.msg;
            $scope.errors = {}; //wipe old errors
            err.fields.forEach(function(field){
                $scope.errors[field] = true;
            });
        }
    }]);
