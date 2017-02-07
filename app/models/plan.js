var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Plan', {
    title : String,
    years  : Object,
    public: Boolean,
    school: String, //TODO make this a model ref
    user  : { type: Schema.Types.ObjectId, ref: 'User' }
});
