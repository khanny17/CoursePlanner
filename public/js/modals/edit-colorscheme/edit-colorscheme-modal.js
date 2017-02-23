angular.module('EditColorschemeModal', ['ui.bootstrap', 'color.picker'])

.service('editColorschemeModal', ['$uibModal', function($uibModal) {
    var self = this;

    self.open = function(colorscheme) {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/modals/edit-colorscheme/edit-colorscheme-modal.html',
            animation: false,
            backdrop: false,
            size: 'sm',
            controller: ['$scope', function(modalScope) {
                modalScope.title = 'Edit Colors';


                //Initialize dom colorscheme variable
                modalScope.newColorscheme = [];
                for (var property in colorscheme) {
                    if (colorscheme.hasOwnProperty(property)) {
                        modalScope.newColorscheme.push({
                            dept: property,
                            color: colorscheme[property]
                        });
                    }
                }

                modalScope.save = function() {
                    //Save new values to the colorscheme
                    modalScope.newColorscheme.forEach(function(deptColorPair) {
                        colorscheme[deptColorPair.dept] = deptColorPair.color;
                    });
                    modalInstance.close();
                };

                modalScope.cancel = function(){
                    modalInstance.close();
                };
            }]
        });
    };
}]);
