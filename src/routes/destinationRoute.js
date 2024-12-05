import express from "express";
import { addDestination, destinationbyid, destinationSearch, getDestination } from "../controllers/destinationController.js";


const destinationRoute=express.Router()

destinationRoute.post("/destination/post",addDestination)
destinationRoute.get("/destination/gets",getDestination)
destinationRoute.get("/destination/gets/:id",destinationbyid)
destinationRoute.get("/destination/gets/search/",destinationSearch)

export default destinationRoute