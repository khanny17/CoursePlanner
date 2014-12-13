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
      element.on('dblclick',function() {
        var course = ngModel.$modelValue;
        var newPopup;
        newPopup = "<div></div>";
        $(newPopup).dialog({
          modal: true,
          width:450,
          resizable:false,
          position: {my: "bottom", at:"center", of: window },
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
                course.details = $(editedCourseDetails).val();
                scope.$apply();
                $(this).dialog('destroy').remove()
              }
          }
        });
      });
    }
  };
});
