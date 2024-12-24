import mongoose from "mongoose";

const foodSpotSchema = mongoose.Schema({
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
  rate: [
    {
      type: Number,
      require: true,
    },
  ],
  types: [
    {
      type: String,
      require: true,
    },
  ],
  //   time: {
  //     type: String,
  //     require: true,
  //   },
  rating: {
    type: String,
    require: true,
  },
  websaite: {
    type: String,
    require: true,
  },
});

const Foodspot = mongoose.model("Foodspot", foodSpotSchema);

export default Foodspot;
