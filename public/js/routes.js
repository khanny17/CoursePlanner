(function () {
    'use strict';

    angular.module('CoursePlannerRoutes', ['ui.router', 'AuthService'])

        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function( $stateProvider,   $urlRouterProvider,   $locationProvider) {
                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(true);

                //Define States here
                $stateProvider
                    .state('home', {
                        url: '/', //The url for the state
                        templateUrl: 'views/home.html', //The path to the html template
                        controller: 'homeController' //The path to the angular controller
                    });
            }]);
}());
