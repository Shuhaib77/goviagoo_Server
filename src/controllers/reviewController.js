import {
  allReview,
  viewYourReview,
  YourReview,
} from "../services/reviewService.js";

export const addreview = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json("user not found");
  }
  const body = req.body;
  console.log(id);
  
//   console.log(title,"bodyyy");
const image=req.cloudinaryImageUrl


  const review = await YourReview(id, body,image);
  if (!review) {
    return res.status(404).json({ message: "add review Failed" });
  }
  res.status(200).json({ message: "review recorded", review: review });
};

export const getReview = async (req, res) => {
  const review = await allReview();
  if (!review) {
    res.status(404).json({ message: "reviewss not finded" });
  }
  res.status(200).json({ message: "reviewss finded", review: review });
};

export const userReview = async (req, res) => {
  const { id } = req.params;
 
  if (!id) {
    res.status(404).json("user not found");
  }
  const review = await viewYourReview(id);
  res.status(200).json({ message: "your review finded", review: review });
};
