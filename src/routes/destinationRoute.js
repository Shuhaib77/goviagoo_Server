import express from "express";
import { addDestination, addToRoadMap, addwithmap, destinationbyid, destinationSearch, getDestination } from "../controllers/destinationController.js";
import tryCatch from "../middlewares/tryCatch.js";


const destinationRoute=express.Router()

destinationRoute.post("/destination/post",tryCatch(addDestination) )
destinationRoute.get("/destination/gets", tryCatch(getDestination) )
destinationRoute.get("/destination/gets/:id",tryCatch(destinationbyid) )
destinationRoute.get("/destination/gets/search/", tryCatch(destinationSearch))
destinationRoute.post("/destination/post/roadmap/:did/:uid",tryCatch( addToRoadMap))
destinationRoute.post("/destination/post/roadmap/:uid/:dname/map",tryCatch(addwithmap) )

export default destinationRoute