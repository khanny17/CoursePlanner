angular.module("userButtonDirective",[])

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
});
