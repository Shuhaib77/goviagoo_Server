import express from "express";
import { googleauth, login, register, veryfyotp } from "../controllers/userAuthController.js";
import tryCatch from "../middlewares/tryCatch.js";

const route=express.Router()


route.post('/register',register)
route.post('/verifyotp',veryfyotp)
route.post('/login',tryCatch(login))
route.post("/googlelogin",tryCatch(googleauth))

export default route