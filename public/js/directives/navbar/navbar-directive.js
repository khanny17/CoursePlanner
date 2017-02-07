angular.module('NavbarDirective',['PlanService', 'AuthService'])

.directive('navbar', ['$http', 'planService', 'authService',
function($http, planService, authService) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'js/directives/navbar/navbar-directive.html',
        link: function(scope) {
            scope.isAuthenticated = authService.isAuthenticated;
            
            scope.logout = function() {
                authService.logout();
            };

            scope.login = function() {
                prompt('Gotta make this show the login modal bub');
            };
        }
    };
}]);

