var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: String,
  address: String,
  rating: Number,
  message: String
//  date: {
//    type: Date,
//    default: Date.now();
//  }
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;