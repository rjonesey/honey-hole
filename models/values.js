let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('Values', new Schema({
  date: Date,
  value1: String,
  score1: Number,
  value2: String,
  score2: Number,
  value3: String,
  score3: Number,
  value4: String,
  score4: Number,
  value5: String,
  score5: Number,
  value6: String,
  score6: Number,
  value7: String,
  score7: Number,
  value8: String,
  score8: Number
}));
