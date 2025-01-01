import mongoose, { Schema } from "mongoose";

const foodSpotBookingSchema = mongoose.Schema({
  foodSpot: {
    type: mongoose.Schema.ObjectId,
    ref: "Foodspot",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  status: {
    type: Boolean,
    default: false,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  customers: {
    type: Number,
    require: true,
  },
  date:{
    type:String,
    require:true

  },
  rate: {
    type: Number,
    require: true,
  },
});

const Foodspotbooking = mongoose.model(
  "Foodspotbooking",
  foodSpotBookingSchema
);

export default Foodspotbooking;
