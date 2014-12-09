angular.module('planService',[])

.factory('Plans', function($http) {
  return {
    get : function() {
      return $http.get('/Planner/plans');
    },
    create :function(title,years,username) {
      return $http.post('/Planner/save', {title: title,years: years,user:username});
    }
  }
});
