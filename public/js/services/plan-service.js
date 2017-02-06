angular.module('PlanService',[])

.service('planService', ['$http', function($http) {
    this.get = function() {
        return $http.get('/api/plan/get');
    };

    this.save = function(title,years,username) {
        return $http.post('/api/plan/save', {
            title: title,
            years: years
        });
    }
}]);
