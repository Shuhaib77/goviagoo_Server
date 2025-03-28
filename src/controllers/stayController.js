import Stay from "../modals/stayModel.js";
import {
  bookingDetails,
  bookYourStay,
  createStay,
  executePayment,
  getStays,
  satywithLocation,
  stayWithId,
} from "../services/stayService.js";

export const addStay = async (req, res) => {
  const { name } = req.body;
  const body = req.body;
  if (!body) {
    return res.status(404).json({ message: "name not found" });
  }

  const stay = await createStay(name, body);
  if (!stay) {
    return res.status(404).json({ message: "creation of stay failed" });
  }
  res.status(200).json({ message: "stay created", stay: stay });
};

export const allStay = async (req, res) => {
  const data = await getStays();
  if (!data) {
    return res.status(404).json({ message: "Stay fetching faild" });
  }
  res.status(200).json({ message: "Stay fetch successed", data });
};

export const stayById = async (req, res) => {
  const { id } = req.params;
  console.log(id, "LLLLLL");
  if (!id) {
    return res.status(404).json({ message: " stay id not found" });
  }
  const data = await stayWithId(id);
  if (!data) {
    return res.status(404).json({ message: "Stay fetching faild" });
  }
  res.status(200).json({ message: "Stay fetch successed", data });
};

export const getStayWithLocation = async (req, res) => {
  const { lat, lng } = req.params;
  console.log(lat, lng);

  if (!lat || !lng) {
    return res.status(404).json({ message: " error lat,lng requird" });
  }
  const data = await satywithLocation(lat, lng);
  if (!data) {
    return res.status(404).json({ message: " stay not found for the place" });
  }
  res.status(200).json({ message: "stay finded for the place", data: data });
};

export const BookStay = async (req, res) => {
  const { uid, id,rid } = req.params;
  console.log(uid, id,rid, "lololoo");

  const body = req.body;

  try {
    const data = await bookYourStay(uid, id, body,rid);
    res.status(200).json({ message: "Booking initiated", data: data });
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

export const paymentExecute = async (req, res) => {
  const { uid, id, rate, roomNo, days,rid } = req.params;
  console.log(uid, id, rate, roomNo, days,rid, "lfrlfd");

  const { PayerID: payerId, paymentId } = req.query;
  console.log(payerId, paymentId);

  try {
    const booking = await executePayment(
      uid,
      id,
      rate,
      payerId,
      paymentId,
      roomNo,
      days,
      rid
    );
    res.status(200).json({ message: "Payment successful", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment execution failed", error: error.message });
  }
};

export const StayBookingDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id,"hhh");
  
  if (!id) {
    res.status(404).json({ message: "user no found" });
  }
  const data = await bookingDetails(id);
  if (!data) {
    res.status(404).json({ message: "booking not find" })
  }
  res.status(200).json({ message: "stay booking findede" ,data:data});
};
