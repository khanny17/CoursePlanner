angular.module('PlanService',[])

.service('planService', ['$http', function($http) {
    this.plan = {};

    this.getMine = function(){
        return $http.get('/api/plan/getMine');
    };

    this.load = function() {
        return $http.get('/api/plan/load');
    };

    this.save = function(title, years, public) {
        return $http.post('/api/plan/save', {
            title: title,
            years: years,
            public: public
        });
    };
}]);
