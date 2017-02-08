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
        if(!callbacks[eventName]) {
            return;
        }

        callbacks[eventName].forEach(function(cb){
            cb(param);
        });
    };
}]);
