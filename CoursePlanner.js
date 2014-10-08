var app = angular.module("CoursePlanner", []);

app.controller('courseCtrl', function($scope) {
  $scope.years = [{

      title: "Year 1",
      semester1: [
        {subj: 'SWEN', num:"101", credits:1},
        {subj: 'MATH', num:"190", credits:3},
        {subj: 'STAT', num:"250", credits:3},
        {subj: 'SWEN', num:"220", credits:3}
      ],
      semester2: [
        {subj: 'SWEN', num:"250", credits:3},
        {subj: 'MATH', num:"180", credits:4},
        {subj: 'CSCI', num:"142", credits:4},
      ]
    }, {
      title: "Year 2",
      semester1: [
        {subj: 'FNRT', num:"101", credits:1},
        {subj: 'FNRT', num:"390", credits:3},
        {subj: 'WREC', num:"250", credits:3},
        {subj: 'SWEN', num:"362", credits:3}
      ],
      semester2: [
        {subj: 'CSCI', num:"250", credits:3},
        {subj: 'MATH', num:"182", credits:4},
        {subj: 'CSCI', num:"148", credits:4},
      ]
    }
  ];
});

app.directive('sortable', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.sortable({
        connectWith: ".connectedSortable",
        receive: function(event,ui) {
          console.log(ui.item.index());
          console.log(ui.sender);
          console.log("try to print model array");         
        },
        stop: function(event,ui) {
          console.log(ui.item.index());
        }
      }).disableSelection();
    }
  };
});
