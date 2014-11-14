var app = angular.module("CoursePlanner", ['ui.sortable']);

app.controller('courseCtrl', ['$scope','$http', function($scope,$http) {
  $scope.years = [];

  $http.get('app/files/default.json').success(function(data){
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

  $scope.load = function(data) {
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
