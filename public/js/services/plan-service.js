angular.module('PlanService',['NotificationService', 'cfp.hotkeys', 'AuthService'])

.service('planService', ['$http', '$q', 'notificationService', 'hotkeys', 'authService',
    function($http, $q, notificationService, hotkeys, authService) {
        var self = this;

        self.makeNew = function(){
            self.plan = {
                years: [],
                title: 'New Plan',
                public: false,
                colorscheme: {}
            };

            notificationService.notify('plan-changed');
        };

        self.makeNew(); //Start with a clean plan

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
            self.updateColors();
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

        //Adds colors to the colorscheme wherever necessary
        self.updateColors = function() {
            if(!self.plan.colorscheme) {
                self.plan.colorscheme = {};
            }
            //Loop through every course, and if we don't have a color for that dept,
            //create one
            self.plan.years.forEach(function(year){
                year.semesters.forEach(function(semester){
                    semester.classes.forEach(function(course){
                        if(!self.plan.colorscheme[course.dept]) {
                            self.plan.colorscheme[course.dept] = randomColor();
                        }
                    });
                });
            });
        };

        self.downloadPDF = function() {
            var tag = document.getElementById('the-plan');
            //TODO we need to not crop this when we make the image
            html2canvas(tag, {
                onrendered: function(canvas) {
                    var image = new Image();
                    image.src = canvas.toDataURL("image/png");

                    var doc = new jsPDF({
                        orientation: 'landscape'
                    });

                    doc.addImage(image, 'PNG', 0, 0, 296, 210);
                    doc.save(self.plan.title + '.pdf');
                }
            });
        };

        hotkeys.add({
            combo: 'ctrl+s',
            description: 'Save Plan (If logged in)',
            callback: function() {
                if(authService.isAuthenticated()) {
                    self.save();
                }
            }
        });

    }]);
