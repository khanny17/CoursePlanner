angular.module('planService',[])

.factory('Plans', function($http) {
  return {
    get : function() {
      return $http.get('/Planner/plans');
    },
    create :function(title,years) {
      return $http.post('/Planner', {title: title,years: years});
    }
  }
});
