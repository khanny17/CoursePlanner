angular.module('planService',[])

.factory('Plans', function($http) {
  return {
    get : function() {
      return $http.get('/api/plan/getAll');
    },
    create :function(title,years,username) {
      return $http.post('/api/plan/save', {title: title,years: years,user:username});
    }
  }
});
