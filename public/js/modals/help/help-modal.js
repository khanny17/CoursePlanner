angular.module('HelpModal', ['ui.bootstrap', 'cfp.hotkeys'])

.service('helpModal', ['$uibModal', 'hotkeys', function($uibModal, hotkeys) {
    var self = this;

    self.open = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/modals/help/help-modal.html',
            animation: false,
            backdrop: false,
            controller: ['$scope', function(modalScope){
                modalScope.close = modalInstance.close;
            }]
        }).then(null, function() {
            //Modal closed via esc or something
            //Thus this is not actually an error
            //even if it is an error, this is a help modal. 
            //What could the error possibly be?
            return;
        });
    };

    hotkeys.add({
        combo: 'ctrl+h',
        description: 'Open Help',
        callback: function() {
            self.open();
        }
    });
}]);

