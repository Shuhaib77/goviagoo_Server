import mongoose from "mongoose";
const connectdb = () => {
  mongoose
    .connect("mongodb://localhost:27017/Goviagooo")
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectdb;
