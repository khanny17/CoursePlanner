/**
 * REST endpoints for School data
 * @namespace api/school
 */
(function () {
    'use strict';

    var School = require('../models/school');

    var init = function(router) {
        router.get('/get-schools', endpoints.getSchools);
    };

    var endpoints = {
        /** 
         * Send all the schools
         * @function 
         * @memberof api/school
         * @instance
         */
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
