import express from "express";
import { googleauth, login, register, veryfyotp } from "../controllers/userAuthController.js";
import tryCatch from "../middlewares/tryCatch.js";
import uploadimage from "../middlewares/multer.js";
// import { uploadimage } from "../middlewares/multer.js";

const route=express.Router()


route.post('/register',register)
route.post('/verifyotp' , uploadimage,veryfyotp)
route.post('/login',tryCatch(login))
route.post("/googlelogin",tryCatch(googleauth))

export default route