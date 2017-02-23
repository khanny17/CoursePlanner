angular.module('CourseDirective', ['ui.bootstrap', 'labeled-inputs'])

.directive('course', ['$uibModal', function($uibModal) {
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
                            for (var property in modalScope.c) {
                                if (modalScope.c.hasOwnProperty(property)) {
                                    scope.course[property] = modalScope.c[property];      
                                }
                            }
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
