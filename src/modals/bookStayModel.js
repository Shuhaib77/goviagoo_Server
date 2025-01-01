import mongoose, { Schema } from "mongoose";

const stayBookingSchema = mongoose.Schema(
  {
    stay: [
      {
        type: mongoose.ObjectId,
        ref: "Stay",
      },
    ],
    userId: {
      type: Schema.ObjectId,
      ref: "Users",
    },
    status: {
      type: Boolean,
      default: false,
      require: true,
    },
    days: {
      type: Number,
      require: true,
    },
    rate: {
      type: Number,
      require: true,
    },
    roomNo: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const stayBooking = mongoose.model("stayBooking", stayBookingSchema);

export default stayBooking;
