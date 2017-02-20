//This script populates the db with the school data

//Load environment variables
require('dotenv').load();

var config         = require(__dirname + '/../../config/config');
var mongoose       = require('mongoose');

//DB
mongoose.connect(config.db.url, function(err) {
    console.log(err || 'Mongoose Connected Successfully'); //TODO on error, close application
});//, {authMechanism: 'ScramSHA1'}); 

var School = require(__dirname + '/../models/school.js');

var fs = require('fs');
var schools;
fs.readFile(__dirname + '/schools.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    schools = JSON.parse(data);

    School.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log('Deleted Schools');
    }).then(function(){
        schools.forEach(function(school){
            //Create or update all the schools
            School.create({
                name: school.name,
                entityName: school.entityName,
                alias: school.alias
            }, function(err, school) {
                if(err) {
                    console.log(err);
                }
            });
        });
    });
});
