angular.module('PlanService',['NotificationService'])

.service('planService', ['$http', 'notificationService', function($http, notificationService) {
    var self = this;
    self.plan = {
        years: [],
        title: 'New Plan',
        public: false
    };

    //TODO auto load the most recently edited plan

    self.getMine = function(){
        return $http.get('/api/plan/getMine');
    };

    self.load = function() {
        return $http.get('/api/plan/load')
        .then(function(response){
            self.plan = response.data;
            notificationService.notify('plan-save-success');
        });
    };

    self.save = function(title, years, public) {
        return $http.post('/api/plan/save', self.plan)
        .then(function(response){
            self.plan = response.data;
            notificationService.notify('plan-save-success');
        });
    };
}]);
