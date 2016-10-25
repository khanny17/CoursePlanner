angular.module('CoursePlanner', [
    'CoursePlannerRoutes',
    'courseCtrl',
    'navbarController',
    'authController',
    'courseDirectives',
    'sidebarController',
    'sidebarDirectives',
    'authDirectives',
    'planService',
    'courseService',
    'AuthService' 
])

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

