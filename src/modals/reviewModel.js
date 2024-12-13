import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    require: true,
  },
  review: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

const Reviews=mongoose.model("Reviews",reviewSchema)

export default Reviews
