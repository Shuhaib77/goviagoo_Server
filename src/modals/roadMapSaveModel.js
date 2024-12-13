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
  destinationsId: [{
    type: mongoose.Schema.ObjectId,
    ref: "Roadmap",
  }],
});


const Saveroadmap=mongoose.model("Savedroadmap",saveSchema)

export default Saveroadmap