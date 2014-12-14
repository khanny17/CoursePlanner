var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema ({
  name    : { type : String, required : true },
  dept    : { type : String, required : true },
  num     : { type : String, required : true },
  credits : { type : Number, required : true },
  details : String,
  status  : { type : String, enum : ['todo','taking','completed'], default : 'todo' }
});

//Two courses are equal if all the non-personal fields are equal
courseSchema.methods.equals = function equals(course) {
  return this.name === course.name && this.dept    === course.dept    &&
         this.num  === course.num  && this.credits === course.credits
};

var Course = mongoose.model('Course',courseSchema);


Course.schema.path('dept').validate(function(dept) {
  return dept.length < 11;
}),"Department Field too long!";



//All Profanity Detection
var profanity = new RegExp("fuck|shit|bitch");
Course.schema.path('dept').validate(function(value) {
  return !(profanity.test(value.toLowerCase()));
},"Profanity Detected");

Course.schema.path('name').validate(function(value) {
  return !(profanity.test(value.toLowerCase()));
},"Profanity Detected");

Course.schema.path('num').validate(function(value) {
  return !(profanity.test(value.toLowerCase()));
},"Profanity Detected");

Course.schema.path('details').validate(function(details) {
  return !(profanity.test(details.toLowerCase()));
},"Profanity Detected");

module.exports = Course;
