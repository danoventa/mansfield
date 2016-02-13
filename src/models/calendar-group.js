import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CalendarGroup = new Schema({
  id: ObjectId,
  name: String,
  members: Array
});

const model = mongoose.model("CalendarGroup", CalendarGroup);

export default model;
