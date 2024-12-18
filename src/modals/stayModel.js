import mongoose from "mongoose";

const staySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    location: {
      latitude: {
        type: Number,
        require: true,
      },
      longitude: {
        type: Number,
        require: true,
      },
    },
    rate: {
      type: Number,
      require: true,
    },
    days: {
      type: Number,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    rooms: [
      {
        type: String,
        require: true,
      },
    ],
    websaite: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Stay = mongoose.model("Stay", staySchema);

export default Stay;
