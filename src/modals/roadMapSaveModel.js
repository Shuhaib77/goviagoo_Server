import mongoose from "mongoose";

const saveSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userId: {
    type:mongoose.Schema.ObjectId,
    require: "Users",
  },
  roadmapId: [{
    type: mongoose.Schema.ObjectId,
    ref: "Destination",
  }],
});


const Saveroadmap=mongoose.model("Saveroadmap",saveSchema)

export default Saveroadmap