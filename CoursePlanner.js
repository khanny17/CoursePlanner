var app = angular.module("CoursePlanner", []);

app.controller('courseCtrl', function($scope) {
  $scope.courses = [
    {subj: 'SWEN', num:"101", credits:1},
    {subj: 'MATH', num:"190", credits:3},
    {subj: 'STAT', num:"250", credits:3},
    {subj: 'SWEN', num:"220", credits:3}
  ];
  
  $scope.y1 = [];
});

app.directive('sortable', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.sortable({
        connectWith: ".connectedSortable"
      }).disableSelection();
    }
  };
});