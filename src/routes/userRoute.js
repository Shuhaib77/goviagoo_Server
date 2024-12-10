import express from "express";
import { getUser, updateUser, viewRoadmap } from "../controllers/userController.js";
import tryCatch from "../middlewares/tryCatch.js";

const userRoute=express.Router()

userRoute.get("/profile/:id", tryCatch(getUser) )
userRoute.put("/profile/update/:id",tryCatch(updateUser))
userRoute.get("/profile/roadmap/:id", tryCatch(viewRoadmap))

export default userRoute