import mongoose from "mongoose";

const roadMapSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  name: {
    type: "string",
    require: true,
  },
  destinations: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Destination",
    },
  ],
  optimizeroute: [
    {
      type: String,
      require: true,
    },
  ],
  status:{
    type:Boolean,
    default:false

  },
  stayBookings:[{
    type:String,
    ref:"stayBooking",
    require:true

  }],
  foodBookings:[{
    type:String,
    ref:"Foodspotbooking",
    require:true

  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Roadmap = mongoose.model("Roadmap", roadMapSchema);

export default Roadmap;

// {
//     "_id": "ObjectId",
//     "userId": "ObjectId (users)",
//     "name": "String",
//     "destinations": [
//       {
//         "destinationId": "ObjectId (destinations)",
//         "customStops": ["String"]
//       }
//     ],
//     "optimizedRoutes": ["String"],
//     "status": "String (draft/completed)",
//     "createdAt": "Date",
//     "updatedAt": "Date"
//   }
