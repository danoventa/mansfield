import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CalendarPerson = new Schema({
  id: ObjectId,
  name: String,
  email: Array
});

const model = mongoose.model("CalendarPerson", CalendarPerson);

module.exports = model;
