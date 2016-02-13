import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export default new Schema({
  id: ObjectId,
  author: String,
  quote: String
});
