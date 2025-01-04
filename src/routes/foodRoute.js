import express from 'express'
import { addFoodSpots, allSpot, BookFoodSpot, foodBokingDetails, foodById, getFoodWithLocation, paymentExecute } from '../controllers/foodSpotController.js'



const foodRoute=express.Router()

foodRoute.post("/post/foodspot",addFoodSpots)
foodRoute.get("/get/foodspot",allSpot)
foodRoute.get("/get/foodspot/:id",foodById)
foodRoute.get("/get/foodspot/location/:lat/:lng",getFoodWithLocation)


foodRoute.post("/food/book/:fid/:uid/:rid",BookFoodSpot)
foodRoute.get("/foodbook/:fid/:uid/:rate/:type/:date/:customer/:rid/success/",paymentExecute)
foodRoute.get("/cancel")
foodRoute.get("/foodBook/details/:id",foodBokingDetails)

export default foodRoute