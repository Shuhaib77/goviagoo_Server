import express from "express";
import {
  addFoodSpots,
  allSpot,
  BookFoodSpot,
  foodBokingDetails,
  foodById,
  getFoodWithLocation,
  paymentExecute,
} from "../controllers/foodSpotController.js";
import tryCatch from "../middlewares/tryCatch.js";
import { errorHndler } from "../middlewares/globelMiddleware.js";

const foodRoute = express.Router();

foodRoute.post("/post/foodspot",errorHndler, tryCatch(addFoodSpots));
foodRoute.get("/get/foodspot", errorHndler, tryCatch(allSpot));
foodRoute.get("/get/foodspot/:id",errorHndler,  tryCatch(foodById));
foodRoute.get(
  "/get/foodspot/location/:lat/:lng",
  tryCatch(getFoodWithLocation)
);

foodRoute.post("/food/book/:fid/:uid/:rid",errorHndler,  tryCatch(BookFoodSpot));
foodRoute.get(
  "/foodbook/:fid/:uid/:rate/:type/:date/:customer/:rid/success/",
  errorHndler, tryCatch(paymentExecute)
);
foodRoute.get("/cancel");
foodRoute.get("/foodBook/details/:id",errorHndler,  tryCatch(foodBokingDetails));

export default foodRoute;
