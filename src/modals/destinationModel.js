import mongoose from "mongoose";

const destinationSchema = mongoose.Schema({
  image:[ {
    type: String,
    require: true,
  }],
  name: {
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
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

const Destination=mongoose.model("Destination",destinationSchema)
export default Destination
