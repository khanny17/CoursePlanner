var app = angular.module("CoursePlanner", ['ui.sortable']);

app.controller('courseCtrl', ['$scope','$http', function($scope,$http) {
  $scope.years = [];

  $http.get('app/files/default.json').success(function(data){
    $scope.years = data;
  });

  $scope.maxSemesters=4;

  $scope.errormsg = "";
  $scope.setErrorMsg = function(text) {
    $scope.errormsg = text;
  }

  $scope.save = function() {
    var data = JSON.stringify($scope.years);
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
    window.open(url, '_blank');
    window.focus();
  }

  $scope.load = function(data) {
    console.log(data);
    $scope.years = data;
  }

  $scope.addYear = function() {
    $scope.years.push(new function() {
      this.title="NEW YEAR";
      this.semesters=[];
    });
  }

  $scope.removeYear = function(index) {
    $scope.years.splice(index,1);
  }

  $scope.removeSemester = function(year,index) {
    year.semesters.splice(index,1);
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
      this.subj="SUBJ";
      this.num="000";
      this.credits=0;
    });
  }
}]);


app.directive('addyear', function() {
  return {
    restrict: 'A',
    scope:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        scope.$apply("addYear()");
      });
    }
  };
});

app.directive('removeyear', function() {
  return {
    restrict: 'A',
    scope:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        if(confirm("Delete this year and classes?")) {
          scope.$apply("removeYear(element.$index)");
        }
      });
    }
  };
});

app.directive('addsemester', function() {
  return {
    restrict: 'A',
    scope:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        scope.$apply("addSemester(year)");
        if(scope.year.semesters.length>scope.maxSemesters-1) {
          element.remove();
        }
      });
    }
  };
});

app.directive('removesemester', function() {
  return {
    restrict: 'A',
    scope:true,
    link: function(scope,element,attrs) {
      element.click(function() {
          if(confirm("Delete this semester and classes?")) {
            scope.$apply("removeSemester(year,element.$index)");
          }

      });
    }
  };
});

app.directive('addcourse', function() {
  return {
    restrict:'A',
    scope:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        scope.$apply("addCourse(semester)");
      });
    }
  };
});

app.directive('contenteditable',function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});

app.directive('downloadplan',function($http) {
  return {
    restrict:'E',
    template:"<button>Download as JSON</button>",
    replace:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        scope.save();
      });
    }
  };
});

app.directive('loadplan',function() {
  return {
    restrict:'E',
    template:"<button>Upload JSON</button>",
    replace:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        var text = prompt("paste json file here");
        if(text != null) {
          try {
            var data = JSON.parse(text);
            scope.load(data);
          } catch(e) {
            scope.setErrorMsg('invalid json file');
          }

          scope.$apply();
        }
      });
    }
  };
});
