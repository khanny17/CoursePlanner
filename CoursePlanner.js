var app = angular.module("CoursePlanner", []);

app.controller('courseCtrl', function($scope) {
  $scope.years = [{

      title: "Year 1",
      semesters: [{
        classes: [
          {subj: 'SWEN', num:"101", credits:1},
          {subj: 'MATH', num:"190", credits:3},
          {subj: 'STAT', num:"250", credits:3},
          {subj: 'SWEN', num:"220", credits:3}
        ]},{
        classes: [
          {subj: 'SWEN', num:"250", credits:3},
          {subj: 'MATH', num:"180", credits:4},
          {subj: 'CSCI', num:"142", credits:4},
        ]}
      ]
    }, {
      title: "Year 2",
      semesters: [{
        classes: [
          {subj: 'FNRT', num:"101", credits:1},
          {subj: 'FNRT', num:"390", credits:3},
          {subj: 'WREC', num:"250", credits:3},
          {subj: 'SWEN', num:"362", credits:3}
        ]},{
        classes: [
          {subj: 'CSCI', num:"250", credits:3},
          {subj: 'MATH', num:"182", credits:4},
          {subj: 'CSCI', num:"148", credits:4},
        ]}
      ]
    }
  ];

  $scope.addYear = function() {
    $scope.years.push(new function() {
      this.title="NEW YEAR";
      this.semesters=[];
    });
  }

  $scope.addSemester = function(year) {
    if(year.semesters.length < 2) {
      year.semesters.push(new function() {
        this.classes=[];
      });
    }
  }

  $scope.addCourse = function(semester) {
    semester.classes.push(new function() {
      this.subj="SUBJ";
      this.num="000";
      this.credits=0;
    });
  }
});


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

app.directive('addsemester', function() {
  return {
    restrict: 'A',
    scope:true,
    link: function(scope,element,attrs) {
      element.click(function() {
        scope.$apply("addSemester(year)");
        if(scope.year.semesters.length>1) {
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

app.directive('subj', ['$parse', function($parse) {
  return {
    restrict:'E',
    scope:true,
    require:'?ngModel',
    template:"<p class='course-detail'>{{c.subj}}</p>",
    link: function(scope,element,attrs,controller) {
      element.click(function() {
        console.log(controller);
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



app.directive('sortable', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.sortable({
        connectWith: ".connectedSortable",
        receive: function(event,ui) {
          console.log(ui.item.index());
          console.log(ui.sender);
          console.log(event.target);

          scope.$apply();
        },
        stop: function(event,ui) {
          console.log(ui.item.index());
        }
      }).disableSelection();
    }
  };
});
