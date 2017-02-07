'use strict';
angular.module('NotificationService', [])

.service('notificationService', [function(){
    var callbacks = {
        //eventName: [Function]
    };

    this.on = function(eventName, callback) {
        if(!callbacks[eventName]) {
            callbacks[eventName] = [];
        }

        callbacks[eventName].push(callback); 
    };

    this.notify = function(eventName, param) {
        _.forEach(callbacks[eventName], function(cb){
            cb(param);
        });
    };
}]);
