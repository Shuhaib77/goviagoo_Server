import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  savedRoadmaps: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Roadmap",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Reviews",
    },
  ],
  // googleId: {
  //   type: String,
  //   require:true
  // },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
