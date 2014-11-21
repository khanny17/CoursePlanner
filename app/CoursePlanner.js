var app = angular.module("CoursePlanner", ['ui.sortable']);

app.controller('courseCtrl', ['$scope','$http', function($scope,$http) {
  $scope.years = [];

  //Display help if no years
  $scope.$watch(
    //Watch if the years is empty
    function(scope) {
      return scope.years.length > 0
    },
    //hide div when view is empty
    function(newValue, oldValue) {
      if(newValue) {
        $('#empty-view').hide();
      } else {
        $('#empty-view').show();
      }
    }
  );

  $scope.maxSemesters=4;

  $scope.sortableOptionsCourse = {
    //'placeholder': 'course',
    'connectWith': '.connectedSortable'
  };

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

  $scope.load = function() {
    var text = prompt("paste json file here");
    if(text != null) {
      try {
        var data = JSON.parse(text);
        $scope.years = data;
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
    }).error(function(data) {
      $scope.setErrorMsg('Invalid Selection');
    });
  }

  $scope.addYear = function() {
    $scope.years.push(new function() {
      this.title="NEW YEAR";
      this.semesters=[];
    });
	$scope.$apply();
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
      this.subj="SUBJ";
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

app.directive('course', function() {
  return {
    restrict:'AE',
    require:"?ngModel",
    link: function(scope,element,attrs,ngModel) {
      element.on('dblclick',function() {
        var course = ngModel.$modelValue;
        var newPopup;
        newPopup = "<div></div>";
        $(newPopup).dialog({
          modal: true,
          width:350,
          resizable:false,
          title: "Edit Course",
          open: function () {
            var markup =
            '<form role="form">\
            \
            <div class="form-group">\
            <label for="name">Name:</label>\
            <input class="form-control input-sm" name="name" id="editedCourseName" value="'+course.name+'" />\
            </div>\
            \
            <div class="form-group">\
            <label for="subj">Subject:</label>\
            <input class="form-control input-sm" name="subj" id="editedCourseSubject" value="'+course.subj+'"/>\
            </div>\
            \
            <div class="form-group">\
            <label for="num">Number:</label>\
            <input class="form-control input-sm" name="num" id="editedCourseNum" value="'+course.num+'"/>\
            </div>\
            \
            <div class="form-group">\
            <label for="cred">Credits:</label>\
            <input class="form-control input-sm" name="cred" id="editedCourseCred" value="'+course.credits+'"/>\
            </div>\
            \
            </form>';
            $(this).html(markup);
          },
          close: function() {
            $(this).dialog('destroy').remove()
          },
          buttons: {
              Cancel: {
                text:"Cancel",
                click: function () {
                  $(this).dialog('destroy').remove()
                }
              },
              Delete: function() {
                scope.$apply(scope.deleteCourse(course));
                $(this).dialog('destroy').remove()
              },
              Save: function() {
                //update model
                course.subj = $(editedCourseSubject).val();
                course.name = $(editedCourseName).val();
                course.num = $(editedCourseNum).val();
                course.credits = $(editedCourseCred).val();
                scope.$apply();
                $(this).dialog('destroy').remove()
              }
          }
        });
      });
    }
  };
});
