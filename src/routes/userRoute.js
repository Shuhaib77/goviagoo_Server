import express from "express";
import {
  getUser,
  updateUser,
  viewRoadmap,
} from "../controllers/userController.js";
import tryCatch from "../middlewares/tryCatch.js";
import {
  addreview,
  getReview,
  userReview,
} from "../controllers/reviewController.js";
import uploadimage from "../middlewares/multer.js";
import { addtoSave, savedViiew } from "../controllers/mapSaveControler.js";
import { errorHndler } from "../middlewares/globelMiddleware.js";

const userRoute = express.Router();

userRoute.get("/profile/:id", errorHndler, tryCatch(getUser));
userRoute.put("/profile/update/:id", errorHndler, tryCatch(updateUser));
userRoute.get("/profile/roadmap/:id", errorHndler, tryCatch(viewRoadmap));
userRoute.post(
  "/user/review/:id",
  errorHndler,
  uploadimage,
  tryCatch(addreview)
);
userRoute.get("/user/review/all", errorHndler, tryCatch(getReview));
userRoute.get("/user/review/:id", errorHndler, tryCatch(userReview));
userRoute.post("/save/roadmap/:rid/:uid", errorHndler, tryCatch(addtoSave));
userRoute.get("/save/view/:id", errorHndler, tryCatch(savedViiew));

export default userRoute;
