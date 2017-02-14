angular.module('SchoolService',[])

.service('schoolService', ['$http', function($http) {
    var self = this;
    self.getSchools = function(){
        return $http.get('/api/school/get-schools')
        .then(function(response){
            if(response.status !== 200) {
                throw 'Response status: ' + response.status;
            }
            return response.data;
        });
    };
}]);
