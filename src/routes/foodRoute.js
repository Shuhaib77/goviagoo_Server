import express from 'express'
import { addFoodSpots, allSpot, foodById, getFoodWithLocation } from '../controllers/foodSpotController.js'


const foodRoute=express.Router()

foodRoute.post("/post/foodspot",addFoodSpots)
foodRoute.get("/get/foodspot",allSpot)
foodRoute.get("/get/foodspot/:id",foodById)
foodRoute.get("/get/foodspot/location/:lat/:lng",getFoodWithLocation)




export default foodRoute