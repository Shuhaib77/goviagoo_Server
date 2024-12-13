import express from "express";
import { getUser, updateUser, viewRoadmap } from "../controllers/userController.js";
import tryCatch from "../middlewares/tryCatch.js";
import { addreview, getReview, userReview } from "../controllers/reviewController.js";
import uploadimage from "../middlewares/multer.js";

const userRoute=express.Router()

userRoute.get("/profile/:id", tryCatch(getUser) )
userRoute.put("/profile/update/:id",tryCatch(updateUser))
userRoute.get("/profile/roadmap/:id", tryCatch(viewRoadmap))
userRoute.post("/user/review/:id",uploadimage,addreview)
userRoute.get("/user/review/all",getReview)
userRoute.get("/user/review/:id",userReview)

export default userRoute