import express from "express";
import { addStay, allStay, BookStay, getStayWithLocation, paymentExecute, StayBookingDetails, stayById } from "../controllers/stayController.js";
import tryCatch from "../middlewares/tryCatch.js";
import { errorHndler } from "../middlewares/globelMiddleware.js";



const AccommadationRote=express.Router()

AccommadationRote.post("/add/stay",errorHndler,tryCatch(addStay) )
AccommadationRote.get("/get/stay",errorHndler, tryCatch(allStay) )
AccommadationRote.get("/get/stay/location/:lat/:lng",errorHndler, tryCatch(getStayWithLocation) )
AccommadationRote.get("/get/stay/:id",errorHndler, tryCatch(stayById) )

AccommadationRote.post("/stay/book/:id/:uid/:rid",errorHndler, tryCatch(BookStay) )
AccommadationRote.get("/staybook/:uid/:id/:rate/:roomNo/:days/:rid/success",errorHndler, tryCatch(paymentExecute))
AccommadationRote.post("/cancel",)
AccommadationRote.get("/stayBook/details/:id",errorHndler, tryCatch(StayBookingDetails) )

// proute.post('/pay/:id', trycatchmidle(createPayment));
// proute.get('/:id/:totalAmount/success', trycatchmidle(executePayment) );
// proute.get('/cancel', trycatchmidle(cancelPayment) );



 export default AccommadationRote