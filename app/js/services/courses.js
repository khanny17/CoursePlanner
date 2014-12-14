angular.module('courseService',[])

.factory('Courses', function($http) {
  return {
    get : function() {
      return $http.get('/Planner/courses');
    },
    create :function(name,dept,num,cred,details,status) {
      return $http.post('/Planner/create/course',
      {name:name, dept:dept, num:num, cred:cred, details:details, status:status});
    }
  }
});
