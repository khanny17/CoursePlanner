var app = angular.module("HomeController", ['ui.sortable', 'PlanService', 'NotificationService']);

app.controller('homeController', ['$scope','$http', 'planService', 'notificationService',
function($scope, $http, planService, notificationService) {
    
    $scope.plan = planService.plan;
    notificationService.on('plan-changed', function(){
        $scope.plan = planService.plan;
    });

    $scope.maxSemesters=4; //TODO config?

    $scope.sortableOptionsCourse = {
        //'placeholder': 'course',
        'connectWith': '.connectedSortable'
    };

    $scope.errormsg = "";
    $scope.setErrorMsg = function(text) {
        $scope.errormsg = text;
    };

    /* Move to planService
    $scope.download = function() {
        var data = JSON.stringify($scope.years);
        var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
        window.open(url, '_blank');
        window.focus();
    };
    */

    /* Move to planService
    $scope.load = function() {
        var text = prompt("paste json file here");
        if(text !== null) {
            try {
                var data = JSON.parse(text);
                $scope.years = data;
                $scope.title = "Pasted JSON";
            } catch(e) {
                $scope.setErrorMsg('invalid json file');
            }
            //$scope.$apply();
        }
    };
    */

    /* Move to planService
    $scope.open = function(dept) {
        path = "files/" + dept + "_default.json";
        $http.get(path).success(function(data){
            $scope.years = data;
            $scope.title = dept + " Default";
        }).error(function(data) {
            $scope.setErrorMsg('Invalid Selection');
        });
    };
    */

    $scope.addYear = function() {
        $scope.plan.years.push({
            title: 'Year ' + ($scope.plan.years.length + 1),
            semesters: [{ classes: [] }, { classes: [] }] //initialize with two semesters
        });
    };

    $scope.removeYear = function(index) {
        //Show a warning if there are classes in any of the semesters
        var danger = false;
        $scope.plan.years[index].semesters.forEach(function(semester){
            if(semester.classes.length > 0) {
                danger = true;
            }
        });

        if(danger) {
            if(confirm("Delete year \"" + $scope.plan.years[index].title + "\" ?")){
                $scope.plan.years.splice(index,1);
            }
        } else {
            $scope.plan.years.splice(index,1);
        }
    };

    $scope.removeSemester = function(year,index) {
        if(year.semesters[index].classes.length > 0) {
            if(confirm("Delete semester \"" + index+1 + "\" ?")){
                year.semesters.splice(index,1);
            }
        } else {
            year.semesters.splice(index,1);
        }
    };

    $scope.addSemester = function(year) {
        if(year.semesters.length < $scope.maxSemesters) {
            year.semesters.push({
                classes: []
            });
        }
    };

    $scope.addCourse = function(semester) {
        semester.classes.push({
            name: "A New Course",
            dept: "DEPT",
            num: "000",
            credits: 0,
            prereqs: []
        });
    };

    $scope.deleteCourse = function(course) {
        $scope.plan.years.forEach(function(year) {
            year.semesters.forEach(function(semester) {
                for(i = 0; i < semester.classes.length; ++i) {
                    if(semester.classes[i] == course) {
                        semester.classes.splice(i,1);
                    }
                }
            });
        });
    };
}]);
