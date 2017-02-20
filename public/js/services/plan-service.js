angular.module('PlanService',['NotificationService'])

.service('planService', ['$http', '$q', 'notificationService', function($http, $q, notificationService) {
    var self = this;
    self.plan = {
        years: [],
        title: 'New Plan',
        public: false
    };

    self.makeNew = function(){
        self.plan = {
            years: [],
            title: 'New Plan',
            public: false
        };

        notificationService.notify('plan-changed');
    };

    //TODO auto load the most recently edited plan

    self.getMine = function(){
        return $http.get('/api/plan/getMine')
        .then(function(response){
            if(response.status !== 200) {
                throw 'Response status: ' + response.status;
            }
            return response.data;
        });
    };

    self.getPublic = function(){
        return $http.get('/api/plan/getPublic')
        .then(function(response){
            if(response.status !== 200) {
                throw 'Response status: ' + response.status;
            }
            return response.data;
        });
    };

    self.load = function(plan) {
        return $http.get('/api/plan/load', { params: { planId: plan._id } })
        .then(function(response){
            self.plan = response.data;
            notificationService.notify('plan-changed');
        });
    };

    self.copyPublicPlan = function(planToCopy) {
        //TODO probably want to check if their plan wasn't saved
        //before we erase their work here
        self.makeNew();
        self.plan.years = planToCopy.years;
        self.plan.title = 'Copy of ' + planToCopy.title;
        notificationService.notify('plan-changed');
        return $q.when();//return empty promise that is instantly resolved
    };

    self.save = function(title, years, public) {
        return $http.post('/api/plan/save', self.plan)
        .then(function(response){
            self.plan = response.data;
            notificationService.notify('plan-changed');
        });
    };

    self.setPublic = function(newPublicValue) {
        var url = newPublicValue ? '/api/plan/makePublic' : '/api/plan/makePrivate';

        return $http.post(url, self.plan)
        .then(function(response){
            self.plan = response.data;
            notificationService.notify('plan-changed');
        });
    };
}]);
