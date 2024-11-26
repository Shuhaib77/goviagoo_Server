import { response } from "express";
import Users from "../modals/userModal.js";
import bcrypt from "bcryptjs";
import { OAuth2Client }from "google-auth-library";
import dotenv from "dotenv";
import tryCatch from "../middlewares/tryCatch.js";

dotenv.config();

export const loginuser = async (email, password) => {
  // const {email}=req.body
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("user not found ");
    }
    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) {
      throw new Error("password incorrect");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// ---------------------------------------------

const client =new OAuth2Client(process.env.GOOGLE_CLIENT);
export const googleVerify = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience:process.env.GOOGLE_CLIENT

    });
    const payload = ticket.getPayload();
    const { email, email_verified, name, picture } = payload;
    console.log(email,"tgvt4v");
    
    if (!email_verified) {
      throw new Error("email is not verified");
    }
    return { email, picture, name };
  } catch (error) {
    throw error;
  }
};
