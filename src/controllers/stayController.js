import Stay from "../modals/stayModel.js";
import {
  bookYourStay,
  createStay,
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


export const stayById = async (req,res) => {
  const {id}= req.params
  console.log(id,"LLLLLL");
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
  const { uid, sid } = req.params;
  const body = req.body;
  const data = await bookYourStay(uid, sid, body);

  if (!data) {
    return res.status(404).json({ message: "booking failed" });
  }
  res.status(200).json({ message: "booking success", data: data });
};
