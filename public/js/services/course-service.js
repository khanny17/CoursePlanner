angular.module('courseService',[])

.factory('Courses', function($http) {
    return {
        get : function() {
            return $http.get('/api/course/get');
        },
        create :function(name,dept,num,cred,details,status) {
            return $http.post('/api/course/create',
                {name:name, dept:dept, num:num, cred:cred, details:details, status:status});
        }
    };
});
