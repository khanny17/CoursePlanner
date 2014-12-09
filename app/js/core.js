angular.module('CoursePlanner', [
    'courseCtrl',
    'authController',
    'courseDirectives',
    'sidebarController',
    'sidebarDirectives',
    'authDirectives',
    'planService'])

.run(function($rootScope, $http){
  $rootScope.user = 0;
  $http.get("/loggedin").success(function(user) {
    if(user !== 0)
      $rootScope.user = user;
  });

  $rootScope.auth = function() {
    return $rootScope.user != 0;
  }
});
/*
.config(function($routeProvider, $locationProvider, $httpProvider) {

  //Intercept ajax calls
  $httpProvider.responseInterceptors.push(function($q, $location) {
    return function(promise) {
      return promise.then(
      // Success: just return the response
      function(response){
        return response;
      },
      // Error: check the error status to get only the 401
      function(response) {
        if (response.status === 401)
          $location.url('/login');
        return $q.reject(response);
      });
    }
  });

  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
    // Initialize a new promise
    var deferred = $q.defer();
    // Make an AJAX call to check if the user is logged in
    $http.get('/loggedin').success(function(user){
      // Authenticated
      if (user !== '0') {
        $timeout(deferred.resolve, 0);
      } else {
        $rootScope.message = 'You need to log in.';
        $timeout(function(){
          deferred.reject();
        }, 0);
        $location.url('/login');
      }
    });
  };
});
*/
