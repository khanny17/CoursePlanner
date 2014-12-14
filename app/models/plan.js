var mongoose = require('mongoose');
var Year = mongoose.model('Year');

module.exports = mongoose.model('Plan', {
  title : String,
  years : [Year],
  user : String
});
