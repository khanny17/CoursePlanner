var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('School', {
    name: String,
    entityName: String,
    alias: String
});
