angular.module("authDirectives",[])

.directive('loginmodal', function($rootScope) {
  return {
    restrict:'E',
    templateUrl:'templates/login-modal.html',
    link:function(scope,element,attr) {
      var prevUser;
      var modal = $(element.children()[0]);
      $rootScope.$watch('user', function (val) {
        if(prevUser==0) {
          modal.removeClass('in');
        }
        prevUser = val;

      });
    }
  }
});
