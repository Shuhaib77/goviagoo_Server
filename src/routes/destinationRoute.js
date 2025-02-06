import express from "express";
import { addDestination, addToRoadMap, addwithmap, deleteRoadMap, destinationbyid, destinationSearch, getDestination } from "../controllers/destinationController.js";
import tryCatch from "../middlewares/tryCatch.js";
import { errorHndler } from "../middlewares/globelMiddleware.js";


const destinationRoute=express.Router()

destinationRoute.post("/destination/post",errorHndler,tryCatch(addDestination) )
destinationRoute.get("/destination/gets" ,errorHndler,tryCatch(getDestination) )
destinationRoute.get("/destination/gets/:id",errorHndler,tryCatch(destinationbyid) )
destinationRoute.get("/destination/gets/search/",errorHndler, tryCatch(destinationSearch))
destinationRoute.post("/destination/post/roadmap/:did/:uid",errorHndler,tryCatch( addToRoadMap))
destinationRoute.post("/destination/post/roadmap/:uid/:dname/map",errorHndler,tryCatch(addwithmap) )
destinationRoute.delete("/destination/delete/roadmap/:did/:uid",errorHndler,tryCatch(deleteRoadMap) )

export default destinationRoute