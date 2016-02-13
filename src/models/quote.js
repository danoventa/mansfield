import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quote = new Schema({
  id: ObjectId,
  author: String,
  quote: String
});

const model = mongoose.model("Quote", Quote);

export default model;
