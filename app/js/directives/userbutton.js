angular.module("userButtonDirective",[])
/*
.directive('userbutton', function($rootScope) {
  return {
    restrict:'E',
    compile: function(element) {
      if($rootScope.user===0) {
        element.replaceWith('<li><a href="#" id="login-modal-toggle" data-toggle="modal" data-target="#loginModal">Login</a></li>');
      } else {
        element.replaceWith('<li><a href="#">'+ $rootScope.user.username +'</a></li>');
      }
    }
  }
});*/

.directive('userbutton', function ($compile,$rootScope) {
  return {
    restrict: 'E',
    link: function (scope, element, attr) {
      var template1 = '<li><a href="#" id="login-modal-toggle"'+
                      ' data-toggle="modal" data-target="#loginModal">Login</a></li>';

      $rootScope.$watch('user', function (val) {
        if (val==0) {
          $(element).html(template1).show();
          $compile($('#login-modal-toggle'))(scope);
        } else {
          element.replaceWith('<li><a href="#">'+ val.local.username +'</a></li>');
        }
      });
    }
  }
});
