var app = angular.module("HomeController", ['ui.sortable']);

app.controller('homeController', ['$scope','$http', function($scope,$http) {
    $scope.years = [];
    $scope.title = "New Plan";

    $scope.maxSemesters=4;

    $scope.sortableOptionsCourse = {
        //'placeholder': 'course',
        'connectWith': '.connectedSortable'
    };

    $scope.errormsg = "";
    $scope.setErrorMsg = function(text) {
        $scope.errormsg = text;
    }

    $scope.download = function() {
        var data = JSON.stringify($scope.years);
        var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
        window.open(url, '_blank');
        window.focus();
    }

    $scope.load = function() {
        var text = prompt("paste json file here");
        if(text != null) {
            try {
                var data = JSON.parse(text);
                $scope.years = data;
                $scope.title = "Pasted JSON";
            } catch(e) {
                $scope.setErrorMsg('invalid json file');
            }
            //$scope.$apply();
        }
    }

    $scope.open = function(dept) {
        path = "files/" + dept + "_default.json";
        $http.get(path).success(function(data){
            $scope.years = data;
            $scope.title = dept + " Default";
        }).error(function(data) {
            $scope.setErrorMsg('Invalid Selection');
        });
    }

    $scope.addYear = function() {
        $scope.years.push(new function() {
            this.title="NEW YEAR";
            this.semesters=[];
        });
    }

    $scope.removeYear = function(index) {
        if($scope.years[index].semesters.length > 0) {
            if(confirm("Delete year \"" + $scope.years[index].title + "\" ?")){
                $scope.years.splice(index,1);
            }
        } else {
            $scope.years.splice(index,1);
        }
    }

    $scope.removeSemester = function(year,index) {
        if(year.semesters[index].classes.length > 0) {
            if(confirm("Delete semester \"" + index+1 + "\" ?")){
                year.semesters.splice(index,1);
            }
        } else {
            year.semesters.splice(index,1);
        }
    }

    $scope.addSemester = function(year) {
        if(year.semesters.length < $scope.maxSemesters) {
            year.semesters.push(new function() {
                this.classes=[];
            });
        }
    }

    $scope.addCourse = function(semester) {
        semester.classes.push(new function() {
            this.name="A New Course";
            this.dept="DEPT";
            this.num="000";
            this.credits=0;
        });
    }

    $scope.deleteCourse = function(course) {
        $scope.years.forEach(function(year) {
            year.semesters.forEach(function(semester) {
                for(i = 0; i < semester.classes.length; ++i) {
                    if(semester.classes[i] == course) {
                        semester.classes.splice(i,1);
                    }
                }
            });
        });
    }
}]);
