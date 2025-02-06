import express from "express";
import { googleauth, login, register, veryfyotp } from "../controllers/userAuthController.js";
import tryCatch from "../middlewares/tryCatch.js";
import uploadimage from "../middlewares/multer.js";
import { errorHndler } from "../middlewares/globelMiddleware.js";
// import { uploadimage } from "../middlewares/multer.js";

const route=express.Router()


route.post('/register',errorHndler,uploadimage,tryCatch(register) )
route.post('/verifyotp' ,errorHndler, uploadimage,tryCatch(veryfyotp) )
route.post('/login',errorHndler,tryCatch(login))
route.post("/googlelogin",errorHndler,tryCatch(googleauth))

export default route