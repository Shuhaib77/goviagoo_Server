import Reviews from "../modals/reviewModel.js";
import Users from "../modals/userModal.js";

export const YourReview = async (id, body,image) => {
  try {
    const user = await Users.findById(id);
    console.log(user);

    const { title } = body;
    console.log(title);

    if (!user) {
      throw new Error("user not Found!!");
    }
    let review = await Reviews.findOne({ title: title });
    if (review) {
      throw new Error("your review about the place is alredy recorded");
    }
    review = await Reviews.create({
      userId: user._id,
      title: body.title,
      review: body.review,
      image: image,
      loaction: body.location,
      date: body.date,
      rating:null
    });
    console.log(review);
    
    user.reviews.push(review._id);
    await user.save();
    return review;
  } catch (error) {
    throw new Error(error);
  }
};

export const allReview = async () => {
  try {
    const reviews = await Reviews.find({});
    if (!reviews) {
      throw new Error("No reviews exist");
    }
    return reviews;
  } catch (error) {
    throw new Error(error);
  }
};

export const viewYourReview = async (id) => {
  try {
    const user = await Users.findById(id).populate({
      path: "reviews",
    });
    if (!user) {
      throw new Error("user not found");
    }
    return user.reviews;
  } catch (error) {
    throw new Error(error);
  }
};
