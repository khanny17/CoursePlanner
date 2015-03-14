angular.module('CoursePlanner', [
    'courseCtrl',
    'navbarController',
    'authController',
    'courseDirectives',
    'sidebarController',
    'sidebarDirectives',
    'authDirectives',
    'planService',
    'courseService'])

.run(function($rootScope, $http){
  $rootScope.user = 0;
  $http.get("/loggedin").success(function(user) {
    if(user !== 0)
      $rootScope.user = user;
  });

  $rootScope.auth = function() {
    return $rootScope.user != 0;
  }

  $rootScope.error = "";
})

//filters by name, dept, dept-num, num, and description
.filter('courseSearch',function() {
  return function(items,query) {
    var filtered = [];
    query = query.toLowerCase();
    //split the query to see if it matches DEPT-NUM form
    var splitQ = query.split(/[\s\-]+/);
    var item,dept,num;
    for(var i = 0; i < items.length; ++i) {
      item = items[i];
      dept = item.dept.toLowerCase();
      num  = item.num.toLowerCase();
      if(~item.name.toLowerCase().indexOf(query))
        filtered.push(item);
      else if(~dept.indexOf(query))
        filtered.push(item);
      else if(~num.indexOf(query))
        filtered.push(item);
      else if(~item.details.toLowerCase().indexOf(query))
        filtered.push(item);
      //check DEPTNUM form
      else if( ~(dept+num).indexOf(query))
        filtered.push(item);
      //check DEPT-NUM form
      else if(splitQ.length === 2 && ~dept.indexOf(splitQ[0])
              && ~num.indexOf(splitQ[1]))
        filtered.push(item);
    }

    return filtered;
  };
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
