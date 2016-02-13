import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CalendarGroup = new Schema({
  id: ObjectId,
  groupName: String,
  groupMembers: Array
});

const model = mongoose.model("CalendarGroup", CalendarGroup);

module.exports = model;
