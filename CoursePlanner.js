var app = angular.module("CoursePlanner", []);

app.controller('courseCtrl', function($scope) {
  $scope.courses = [
    {subj: 'SWEN', num:"101", credits:1, year:1},
    {subj: 'MATH', num:"190", credits:3, year:1},
    {subj: 'STAT', num:"250", credits:3, year:1},
    {subj: 'SWEN', num:"220", credits:3, year:1}
  ];
});

app.directive('draggable', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.draggable({
        revert:"invalid"
      });
    }
  };
});

app.directive('droppable', function($compile) {
    return {
        restrict: 'A',
        link: function(scope,element,attrs){
            element.droppable({
                accept: ".course",
                drop:function(event,ui) {
                  var dragged = angular.element(ui.draggable);
		      dropped = angular.element(this);
		  alert(dragged.attr('id'));
                }
    	    })
        }
    }
});


