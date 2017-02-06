var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Plan', {
    title : String,
    json  : String,
    user  : { type: Schema.Types.ObjectId, ref: 'User' }
});
