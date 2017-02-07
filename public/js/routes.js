(function () {
    'use strict';

    angular.module('CoursePlannerRoutes', ['ui.router', 'AuthService'])

        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function( $stateProvider,   $urlRouterProvider,   $locationProvider) {
                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(true);

                //Define States here
                $stateProvider
                    .state('landing', {
                        url: '/',
                        templateUrl: 'views/landing.html',
                        controller: 'landingController'
                    })
                    .state('register', {
                        url: '/register',
                        templateUrl: 'views/register.html',
                        controller: 'registerController'
                    })
                    .state('home', {
                        url: '/home', //The url for the state
                        templateUrl: 'views/home.html', //The path to the html template
                        controller: 'homeController' //The path to the angular controller
                    });
            }]);
}());
