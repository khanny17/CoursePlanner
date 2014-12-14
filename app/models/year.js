var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var semesterSchema = new Schema ({
  courses : [{ type : Schema.Types.ObjectId, ref : 'Course'  }]
});

var yearSchema = new Schema ({
  title     : String,
  semesters : [semesterSchema]
});

module.exports = mongoose.model('Year', yearSchema);
