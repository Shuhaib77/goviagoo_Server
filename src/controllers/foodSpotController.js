import {
  addSpot,
  bookYourFood,
  executePayment,
  foodBookings,
  foodWithId,
  foodwithLocation,
  getSpot,
} from "../services/foodSpotService.js";

export const addFoodSpots = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(404).json({ message: "name is requird" });
  }
  const body = req.body;

  const data = await addSpot(name, body);

  if (!data) {
    return res.status(404).json({ message: "adding failedd" });
  }
  res.status(200).json({ message: "food spot created", data: data });
};

export const allSpot = async (req, res) => {
  const data = await getSpot();
  if (!data) {
    return res.status(404).json({ message: "foodspot fetching faild" });
  }
  res.status(200).json({ message: "foodspot fetch successed", data });
};

export const foodById = async (req, res) => {
  const { id } = req.params;
  console.log(id, "LLLLLL");
  if (!id) {
    return res.status(404).json({ message: " foodspt id not found" });
  }
  const data = await foodWithId(id);
  if (!data) {
    return res.status(404).json({ message: "foodspot fetching faild" });
  }
  res.status(200).json({ message: "foodspot fetch successed", data });
};

export const getFoodWithLocation = async (req, res) => {
  const { lat, lng } = req.params;
  console.log(lat, lng);

  if (!lat || !lng) {
    return res.status(404).json({ message: " error lat,lng requird" });
  }
  const data = await foodwithLocation(lat, lng);
  if (!data) {
    return res
      .status(404)
      .json({ message: " foodspot not found for the place" });
  }
  res
    .status(200)
    .json({ message: "foodspot finded for the place", data: data });
};

export const BookFoodSpot = async (req, res) => {
  const { fid, uid } = req.params;
  console.log(uid, fid, "lololoo");
  const body = req.body;
  try {
    const data = await bookYourFood(fid, uid, body);
    res.status(200).json({ message: "Booking initiated", data: data });
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

export const paymentExecute = async (req, res) => {
  const { fid, uid, rate, customer, date, type } = req.params;
  console.log(fid, uid, rate, customer, date, type, "lfrlfd");
  const { PayerID: payerId, paymentId } = req.query;
  console.log(payerId, paymentId);
  try {
    const booking = await executePayment(
      fid,
      uid,
      rate,
      customer,
      date,
      type,
      payerId,
      paymentId
    );
    res.status(200).json({ message: "Payment successful", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment execution failed", error: error.message });
  }
};

export const foodBokingDetails = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "user not founnd" });
  }
  const data = await foodBookings(id);
  if (!data) {
    return res.status(404).json({ message: "food spot bookings not find" });
  }
  res.status(200).json({ message: "bookings finded", data: data });
};
