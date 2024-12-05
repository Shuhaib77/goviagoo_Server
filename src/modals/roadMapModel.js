import mongoose from "mongoose"


const roadMapSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    },
    name:{
        type:"string",
        require:true
    },
    destinations:{
        type:mongoose.Schema.ObjectId,
        ref:"Destination"
    },
    optimizeroute:[
        {
            type:string,
            require:true
        }
    ],
    status:{
        type:string,
        require:true

    },
    createdAt:{
        type:Date,
        require:true
    }



})


const Roadmap=mongoose.model("Roadmap",roadMapSchema)

export default Roadmap













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