angular.module('PlanService',[])

.service('planService', ['$http', function($http) {
    this.plan = {};

    this.load = function() {
        return $http.get('/api/plan/load');
    };

    this.save = function(title,years,username) {
        return $http.post('/api/plan/save', {
            title: title,
            years: years
        });
    }
}]);
