(function () {
    'use strict';

    var School = require('../models/school');

    var init = function(router) {
        router.get('/get-schools', endpoints.getSchools);
    };

    var endpoints = {
        getSchools: function(req, res) {
            School.find({}, function(err, schools) {
                if(err) {
                    res.status(500).send(err);
                }
                res.send(schools);
            });
        }
    };

    module.exports = {
        init: init
    };

}());
