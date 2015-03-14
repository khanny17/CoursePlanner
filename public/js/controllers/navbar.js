angular.module('navbarController',[])

.controller('navCtrl',function($scope,$http,Plans,$rootScope) {
  $scope.serverSave = function() {
    var myScope = $scope;
    Plans.create($scope.title,$scope.years,$rootScope.user.local.username)
    .success(function(data) {
      myScope.plans = data;
    });
  };
});
