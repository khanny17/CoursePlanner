angular.module('NavbarDirective',['PlanService'])

.directive('navbar', ['$http', 'planService',
function($http, planService) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'js/directives/navbar-directive/navbar-directive.html',
        link: function(scope) {

        }
    };
}]);

