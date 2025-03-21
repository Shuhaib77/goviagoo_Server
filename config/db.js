import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const connectdb = () => {
  
  mongoose
    .connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
  useUnifiedTopology: true
    })
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectdb;
