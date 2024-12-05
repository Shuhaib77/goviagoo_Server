import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import tryCatch from "../middlewares/tryCatch.js";

const userRoute=express.Router()

userRoute.get("/profile/:id", tryCatch(getUser) )
userRoute.put("/profile/update/:id",tryCatch(updateUser))

export default userRoute