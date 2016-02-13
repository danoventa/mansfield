import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CalendarEvent = new Schema({
  id: ObjectId,
  name: String,
  date: Date
});

const model = mongoose.model("CalendarEvent", CalendarEvent);

export default model;
