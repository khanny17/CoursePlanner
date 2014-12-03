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

.directive('course', function() {
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
