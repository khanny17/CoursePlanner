var app = angular.module("CoursePlanner", ['ui.sortable']);

app.controller('courseCtrl', ['$scope','$http', function($scope,$http) {
  $scope.years = [];

  $http.get('app/files/SWEN_default.json').success(function(data){
    $scope.years = data;
  });

  $scope.maxSemesters=4;

  $scope.trash = [];

  $scope.sortableOptionsCourse = {
    //'placeholder': 'course',
    'connectWith': '.connectedSortable'
  };

  $scope.sortableOptionsTrash = {
    update: function(event,ui) {
      //wipe trash, maybe in the future we could hold on to deleted courses
      $scope.trash = [];
    }
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
      $scope.$apply();
	}
  }

  $scope.open = function(dept) {
    path = "app/files/" + dept + "_default.json";
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
    if(confirm("Delete year \"" + $scope.years[index].title + "\" ?")){
      $scope.years.splice(index,1);
    }
  }

  $scope.removeSemester = function(year,index) {
    if(confirm("Delete semester \"" + index+1 + "\" ?")){
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
}]);

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
          buttons: {
              Cancel: {
                text:"Cancel",
                click: function () {
                  $(this).dialog('destroy').remove()
                }
              },
              Save: function () {
                $(this).dialog("close");
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
