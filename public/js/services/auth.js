(function () {
    'use strict';

    angular.module('AuthService', [])

        .service('authService', function($q, $http) {
            var LOCAL_TOKEN_KEY = 'yourTokenKey';
            var isAuthenticated = false;
            var authToken;

            function loadUserCredentials() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if (token) {
                    useCredentials(token);
                }
            }

            function storeUserCredentials(token) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                useCredentials(token);
            }

            function useCredentials(token) {
                isAuthenticated = true;
                authToken = token;

                // Set the token as header for your requests!
                $http.defaults.headers.common.Authorization = authToken;
            }

            function destroyUserCredentials() {
                authToken = undefined;
                isAuthenticated = false;
                $http.defaults.headers.common.Authorization = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            }

            var register = function(user) {
                return $q(function(resolve, reject) {
                    $http.post('api/user/register', user).then(function(result) {
                        if (result.data.success) {
                            resolve(result.data.msg);
                        } else {
                            reject(result.data.msg);
                        }
                    });
                });
            };

            var login = function(user) {
                return $q(function(resolve, reject) {
                    $http.post('api/user/authenticate', user).then(function(result) {
                        if (result.data.success) {
                            storeUserCredentials(result.data.token);
                            resolve(result.data.msg);
                        } else {
                            reject(result.data.msg);
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
