angular.module('courseDirectives',[])

.directive('contenteditable',function() {
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
})

.directive('course', function($http,$compile,$templateCache) {
  return {
    restrict:'AE',
    require:"?ngModel",
    link: function(scope,element,attrs,ngModel) {
      $http.get("/templates/course-dialog.html").success(function(data) {
        $templateCache.put('course-dialog',data);
      });
      var original = scope.c.status;
      scope.setStatus = function(status) {
        scope.c.status = status;
      };
      element.on('dblclick',function() {
        var course = ngModel.$modelValue;
        var newPopup;
        newPopup = "<div></div>";
        $(newPopup).dialog({
          modal: true,
          width:450,
          resizable:false,
          position: {my: "top", at:"top", of: window },
          title: "Edit Course",
          open: function () {
            var markup;
            scope.$apply(function() {
              markup = $templateCache.get('course-dialog');
              markup = $compile(markup)(scope);
            });
            $(this).html(markup);
          },
          close: function() {
                  //we update the status with ng-model, change it back if canceled
                  course.status = original;
            $(this).dialog('destroy').remove()
          },
          buttons: {
              Cancel: {
                text:"Cancel",
                click: function () {
                  //we update the status with ng-model, change it back if canceled
                  course.status = original;
                  $(this).dialog('destroy').remove()
                }
              },
              Delete: function() {
                scope.$apply(scope.deleteCourse(course));
                $(this).dialog('destroy').remove()
              },
              Save: function() {
                //update model
                course.dept = $(editedCourseSubject).val();
                course.name = $(editedCourseName).val();
                course.num = $(editedCourseNum).val();
                course.credits = $(editedCourseCred).val();
                if(course.details != '')
                  course.details = $(editedCourseDetails).val();
                //status is updated automatically, update the original though
                original = scope.c.status;
                scope.$apply();
                $(this).dialog('destroy').remove()
              }
          }
        });
      });
    }
  };
});
