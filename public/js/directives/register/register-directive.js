angular.module('RegisterDirective', ['ui.bootstrap', 'labeled-inputs', 'AuthService', 'SchoolService'])

.directive('register', [function() {
    return {
        restrict:'E',
        templateUrl: 'js/directives/register/register-directive.html',
        scope: {
            user: '=',
            schools: '='
        },
    };
}]);
