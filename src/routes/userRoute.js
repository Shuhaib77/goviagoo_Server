import express from "express";
import { getUser, updateUser, viewRoadmap } from "../controllers/userController.js";
import tryCatch from "../middlewares/tryCatch.js";
import { addreview, getReview, userReview } from "../controllers/reviewController.js";
import uploadimage from "../middlewares/multer.js";
import { addtoSave, savedViiew } from "../controllers/mapSaveControler.js";

const userRoute=express.Router()

userRoute.get("/profile/:id", tryCatch(getUser) )
userRoute.put("/profile/update/:id",tryCatch(updateUser))
userRoute.get("/profile/roadmap/:id", tryCatch(viewRoadmap))
userRoute.post("/user/review/:id",uploadimage, tryCatch(addreview) )
userRoute.get("/user/review/all", tryCatch(getReview))
userRoute.get("/user/review/:id", tryCatch(userReview) )
userRoute.post("/save/roadmap/:rid/:uid",addtoSave)
userRoute.get("/save/view/:id",savedViiew)




export default userRoute