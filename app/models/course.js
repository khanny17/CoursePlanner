var mongoose = require('mongoose');

var courseSchema = new Schema ({
  name    : { type : String, required : true },
  dept    : { type : String, required : true },
  num     : { type : String, required : true },
  credits : { type : Number, min : 0, max : 20, required : true },
  details : String,
  status  : { type : String, enum : ['todo','taking','completed'], default : 'todo' }
});

var Course = mongoose.model('Course',courseSchema);

Course.schema.path('dept').validate(function(dept) {
  return dept.length < 11;
});

module.exports = Course;
