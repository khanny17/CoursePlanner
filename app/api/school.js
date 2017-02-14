(function () {
    'use strict';

    var path = require('path');

    var init = function(router) {
        router.get('/get-schools', endpoints.getSchools);
    };

    var endpoints = {
        getSchools: function(req, res) {
            res.sendfile(path.resolve(__dirname + '/../../public/files/colleges.json'));
        }
    };

    module.exports = {
        init: init
    };

}());
