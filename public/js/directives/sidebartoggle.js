angular.module('sidebarDirectives',[])

.directive('createbutton', function($http,$compile,$templateCache) {
  return {
    restrict:'AE',
    link: function(scope,element,attrs,ngModel) {
      $http.get("/templates/course-create-dialog.html").success(function(data) {
        $templateCache.put('course-create-dialog',data);
      });
      element.on('click',function() {
        scope.c = {
          name    : "A New Course",
          dept    : "DEPT",
          num     : "000",
          credits : 0,
          details : "",
          status  : "todo"
        };
        var course = scope.c;
        var newPopup;
        newPopup = "<div></div>";
        $(newPopup).dialog({
          modal: true,
          width:450,
          resizable:false,
          position: {my: "top", at:"top", of: window },
          title: "Create Course",
          open: function () {
            var markup;
            scope.$apply(function() {
              markup = $templateCache.get('course-create-dialog');
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

                var details = $(editedCourseDetails).val();
                if(details != course.details)
                  course.details = details;
                scope.$apply();
                scope.create(scope.c);
                $(this).dialog('destroy').remove()
              }
          }
        });
      });
    }
  };
});
