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
                        url: '/welcome',
                        templateUrl: 'views/landing.html',
                        controller: 'landingController'
                    })
                    .state('home', {
                        url: '/', //The url for the state
                        templateUrl: 'views/home.html', //The path to the html template
                        controller: 'homeController' //The path to the angular controller
                    });
            }])

        //Force redirect to landing if not authed
        .run(['$rootScope', '$state', 'authService', 
            function ($rootScope, $state, authService) {
                $rootScope.$on('$stateChangeStart', function (event,next) {
                    if (!authService.isAuthenticated()) {
                        if (next.name !== 'landing') {
                            event.preventDefault();
                            $state.go('landing');
                        }
                    }
                });
            }]);
}());
