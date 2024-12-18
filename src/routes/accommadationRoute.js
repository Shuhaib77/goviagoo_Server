import express from "express";
import { addStay, allStay, BookStay, getStayWithLocation } from "../controllers/stayController.js";


const AccommadationRote=express.Router()

AccommadationRote.post("/add/stay",addStay)
AccommadationRote.get("/get/stay",allStay)
AccommadationRote.get("/get/stay/location/:lat/:lng",getStayWithLocation)
AccommadationRote.post("/stay/book/:sid/:uid",BookStay)

 export default AccommadationRote