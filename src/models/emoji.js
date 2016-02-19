import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Emoji = new Schema({
    id: ObjectId,
    code: String,
    url: String
});

const model = mongoose.model("Emoji", Emoji);

export default model;