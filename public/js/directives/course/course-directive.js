angular.module('CourseDirective', ['ui.bootstrap', 'labeled-inputs', 'PlanService'])

.directive('course', ['$uibModal', 'planService', function($uibModal, planService) {
    return {
        restrict:'E',
        templateUrl: 'js/directives/course/course-directive.html',
        scope: {
            colorscheme: '=',
            course: '=',
            deleteCourse: '=delete',
            readonly: '='
        },
        link: function(scope, element, attrs) {
            if(scope.readonly === true) {
                return; //If readonly, don't allow double click
            }

            //TODO move this to somewhere more efficient
            planService.updateColors();

            element.on('dblclick',function() {
                //If this modal is someday needed somewhere else, abstract this to a modal service
                //and call courseEditModal.open(course);
                //(or something like that idfk)
                var modalInstance = $uibModal.open({
                    templateUrl: 'js/directives/course/course-edit-modal.html',
                    animation: false,
                    backdrop: false,
                    size: 'sm',
                    controller: ['$scope', function(modalScope) {
                        modalScope.c = JSON.parse(JSON.stringify(scope.course)); //clone object so it doesnt bind

                        modalScope.deptColor = scope.colorscheme[scope.course.dept];

                        modalScope.$watch('c.dept', function(newVal, oldVal){
                            if(newVal === oldVal) {
                                return;
                            }

                            //If the user hasn't changed the color, set the color to the new dept's color
                            if(modalScope.deptColor === scope.colorscheme[oldVal]) {
                                modalScope.deptColor = scope.colorscheme[newVal] || randomColor();                                
                            }
                        });

                        modalScope.addPrereq = function(){
                            modalScope.c.prereqs.push({
                                dept: modalScope.prereq.dept,
                                num: modalScope.prereq.num
                            });
                            modalScope.prereq = {}; //clear prereq form
                        };

                        modalScope.removePrereq = function(prereq){
                            var index = modalScope.c.prereqs.indexOf(prereq);
                            modalScope.c.prereqs.splice(index, 1);
                        };

                        modalScope.save = function(){
                            //Copy the properties over
                            for (var property in modalScope.c) {
                                if (modalScope.c.hasOwnProperty(property)) {
                                    scope.course[property] = modalScope.c[property];      
                                }
                            }

                            //Pick a new color if we need to, otherwise set it based on the user's choice
                            scope.colorscheme[scope.course.dept] = modalScope.deptColor;

                            modalInstance.close();
                        };

                        modalScope.delete = function(){
                            scope.deleteCourse(scope.course);
                            modalInstance.close();
                        };

                        modalScope.cancel = function(){
                            modalInstance.close();
                        };
                    }]
                });
            });
        }
    };
}]);
