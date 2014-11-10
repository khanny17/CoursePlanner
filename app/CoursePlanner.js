var app = angular.module("CoursePlanner", ['ui.sortable']);

app.controller('courseCtrl', ['$scope','$http', function($scope,$http) {
  $scope.years = [];

  $http.get('app/files/default.json').success(function(data){
    $scope.years = data;
  });

  $scope.maxSemesters=4;

  $scope.save = function() {
    var data = JSON.stringify($scope.years);
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
    window.open(url, '_blank');
    window.focus();
  }

  $scope.open = function(data) {
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

app.directive('subj', ['$parse', function($parse) {
  return {
    restrict:'E',
    scope:true,
    require:'?ngModel',
    template:"<p class='course-detail'>{{c.subj}}</p>",
    link: function(scope,element,attrs,controller) {
      element.click(function() {
        var child = element.children().get(0);
        if(element.children().get(0).tagName == "P") {
          //if its p, change to an input
          var input = $('<input />', {
            'type': 'text',
            'class': 'course-detail',
            'maxlength': '4',
            'value': $(child).html(),
          });
          //change to p when focus lost
          input.focusout(function () {
            var p = $('<p>'+input.val()+'</p>', {
              'class': 'course-detail',
            });
            $(this).replaceWith(p);
          });
          //update model on keypress
          input.keyup(function () {
            var setFunction = $parse(attrs['ngModel']).assign;
            setFunction(scope, $(input).val());
            scope.$apply();
          });

          $(child).replaceWith(input);
          input.focus();
        }
      });
    }
  };
}]);

app.directive('num', ['$parse', function($parse) {
  return {
    restrict:'E',
    scope:true,
    require:'?ngModel',
    template:"<p class='course-detail'>{{c.num}}</p>",
    link: function(scope,element,attrs,controller) {
      element.click(function() {
        console.log(controller);
        var child = element.children().get(0);
        if(element.children().get(0).tagName == "P") {
          //if its p, change to an input
          var input = $('<input />', {
            'type': 'text',
            'class': 'course-detail',
            'maxlength': '6',
            'value': $(child).html(),
          });
          //change to p when focus lost
          input.focusout(function () {
            var p = $('<p>'+input.val()+'</p>', {
              'class': 'course-detail',
            });
            $(this).replaceWith(p);
          });
          //update model on keypress
          input.keyup(function () {
            var setFunction = $parse(attrs['ngModel']).assign;
            setFunction(scope, $(input).val());
            scope.$apply();
          });

          $(child).replaceWith(input);
          input.focus();
        }
      });
    }
  };
}]);

app.directive('cred', ['$parse', function($parse) {
  return {
    restrict:'E',
    scope:true,
    require:'?ngModel',
    template:"<p class='course-detail'>{{c.credits}}</p>",
    link: function(scope,element,attrs,controller) {
      element.click(function() {
        var child = element.children().get(0);
        if(element.children().get(0).tagName == "P") {
          //if its p, change to an input
          var input = $('<input />', {
            'type': 'text',
            'class': 'course-detail',
            'maxlength': '1',
            'value': $(child).html(),
          });
          //change to p when focus lost
          input.focusout(function () {
            var p = $('<p>'+input.val()+'</p>', {
              'class': 'course-detail',
            });
            $(this).replaceWith(p);
          });
          //update model on keypress
          input.keypress(function (e) {
            //***Don't allow letters
            if (e.which != 8 && e.which != 0 &&
               (e.which < 48 || e.which > 57)) {
              return false;
            } else {
              var setFunction = $parse(attrs['ngModel']).assign;
              setFunction(scope, $(input).val());
              scope.$apply();
            }
          });

          $(child).replaceWith(input);
          input.focus();
        }
      });
    }
  };
}]);


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
        try {
          var data = JSON.parse(text);
        } catch(SyntaxError) {
          alert("Invalid JSON File");
          return;
        }
        if(text != null) {
          scope.$apply(open(data));
        }
      });
    }
  };
});
