import express from "express";
import { addStay, allStay, BookStay, getStayWithLocation, paymentExecute, StayBookingDetails, stayById } from "../controllers/stayController.js";



const AccommadationRote=express.Router()

AccommadationRote.post("/add/stay",addStay)
AccommadationRote.get("/get/stay",allStay)
AccommadationRote.get("/get/stay/location/:lat/:lng",getStayWithLocation)
AccommadationRote.get("/get/stay/:id",stayById)

AccommadationRote.post("/stay/book/:id/:uid/:rid",BookStay)
AccommadationRote.get("/staybook/:uid/:id/:rate/:roomNo/:days/:rid/success",paymentExecute)
AccommadationRote.post("/cancel")
AccommadationRote.get("/stayBook/details/:id",StayBookingDetails)

// proute.post('/pay/:id', trycatchmidle(createPayment));
// proute.get('/:id/:totalAmount/success', trycatchmidle(executePayment) );
// proute.get('/cancel', trycatchmidle(cancelPayment) );



 export default AccommadationRote