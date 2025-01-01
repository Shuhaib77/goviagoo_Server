import express from 'express'
import { addFoodSpots, allSpot, BookFoodSpot, foodById, getFoodWithLocation, paymentExecute } from '../controllers/foodSpotController.js'



const foodRoute=express.Router()

foodRoute.post("/post/foodspot",addFoodSpots)
foodRoute.get("/get/foodspot",allSpot)
foodRoute.get("/get/foodspot/:id",foodById)
foodRoute.get("/get/foodspot/location/:lat/:lng",getFoodWithLocation)


foodRoute.post("/food/book/:fid/:uid",BookFoodSpot)
foodRoute.get("/foodbook/:fid/:uid/:rate/:type/:date/:customer/success/",paymentExecute)
foodRoute.get("/cancel")
// AccommadationRote.post("/stay/book/:id/:uid",BookStay)
// AccommadationRote.get("/staybook/:uid/:id/:rate/:roomNo/:days/success",paymentExecute)
// AccommadationRote.post("/cancel")


export default foodRoute