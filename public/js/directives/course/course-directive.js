angular.module('CourseDirective', ['ui.bootstrap', 'labeled-inputs'])

.directive('course', ['$uibModal', function($uibModal) {
    return {
        restrict:'E',
        templateUrl: 'js/directives/course/course-directive.html',
        scope: {
            course: '=',
            deleteCourse: '=delete'
        },
        link: function(scope, element, attrs) {
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
