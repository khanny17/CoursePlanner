(function () {
    'use strict';

    angular.module('AuthService', [])

        .service('authService', function($q, $http) {
            var LOCAL_TOKEN_KEY = 'CoursePlannerTokenKey';
            var AUTH_USER = 'authUser';
            var isAuthenticated = false;
            var authToken;
            var authUser;

            function loadUserCredentials() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                var user = JSON.parse(window.localStorage.getItem(AUTH_USER));
                if (token && user) {
                    useCredentials(token, user);
                }
            }

            function storeUserCredentials(token, user) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                window.localStorage.setItem(AUTH_USER, JSON.stringify(user));
                useCredentials(token, user);
            }

            function useCredentials(token, user) {
                isAuthenticated = true;
                authToken = token;
                authUser = user;

                // Set the token as header for your requests!
                $http.defaults.headers.common.Authorization = authToken;
            }

            function destroyUserCredentials() {
                authToken = undefined;
                isAuthenticated = false;
                authUser = undefined;
                $http.defaults.headers.common.Authorization = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
                window.localStorage.removeItem(AUTH_USER);
            }

            var register = function(user) {
                return $q(function(resolve, reject) {
                    $http.post('api/user/register', user).then(function(result) {
                        if (result.data.success) {
                            resolve(result.data.msg);
                        } else {
                            reject({ msg: result.data.msg, fields: result.data.fields });
                        }
                    });
                });
            };

            var login = function(user) {
                return $q(function(resolve, reject) {
                    $http.post('api/user/authenticate', user).then(function(result) {
                        if (result.data.success) {
                            storeUserCredentials(result.data.token, result.data.user);
                            resolve(result.data.msg);
                        } else {
                            reject({ msg: result.data.msg, fields: result.data.fields });
                        }
                    });
                });
            };

            var logout = function() {
                destroyUserCredentials();
            };

            loadUserCredentials();

            return {
                login: login,
                register: register,
                logout: logout,
                authenticatedUser: function () {return authUser;},
                isAuthenticated: function() {return isAuthenticated;},
            };
        })

        .factory('AuthInterceptor', function ($rootScope, $q) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: 'Not Authenticated',
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });
}());
