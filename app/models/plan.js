var mongoose = require('mongoose');

module.exports = mongoose.model('Plan', {
  title : String,
  json : String,
  user : String
});
