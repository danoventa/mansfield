var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var Quote = new Schema({
  id: ObjectId,
  author: String,
  quote: String
});

var model = mongoose.model("Quote", Quote);

module.exports = function (params) {
  return new model(params);
};
