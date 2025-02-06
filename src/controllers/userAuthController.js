import otpGenerator from "otp-generator";
import sendEmail from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateOtp, storeOtp } from "../services/otpService.js";
import dotenv from "dotenv";
import { googleVerify, loginuser } from "../services/authService.js";
import Users from "../modals/userModal.js";

dotenv.config();
const secretkey = process.env.SECRET_KEY;
const otpStore = {};
let e = null;
// let pass = null;

export const register = async (req, res) => {
  console.log(req.body);
  
  const { email, password } = req.body;
  // pass = await bcrypt.hash(password, 10);
  if (!email) {
    return res.status(404).json({ message: "email password are require " });
  }
  // console.log(pass);
  e = email;
  console.log(email);
  if (!e) {
    return res.status(404).json({ message: "email not found" });
  }
  console.log(email,password);
  
  const otp = generateOtp();
  storeOtp(email, otp, otpStore);
  await sendEmail(email, `your otp is ${otp} is valide only 5 minutes`, otp);
  res.status(200).json({ message: "email send successfully" });
};

export const veryfyotp = async (req, res) => {
  const { email, otp,password,name } = req.body;
  const pass = await bcrypt.hash(password, 10);
  console.log(req.cloudinaryImageUrl,"lllsw");
  
  console.log(email, "tnvn");
  const storedata = otpStore[e];
  console.log(storedata);
  if (!storedata) {
    return res.status(404).json({ message: "otp not found or expird" });
  }
  const { otp: storedotp, expireAt } = storedata;
  if (Date.now() > expireAt) {
    delete otpStore[e];
    return res.status(404).json({ message: "otp is invalid" });
  }
  if (otp != storedotp ) {
    return res.status(404).json({ message: "otp is mistaken" });
  }
  delete otpStore[email];
  const user=await Users.findOne({email})
  if(user){
   return res.status(404).json({message:"user allredy exist"})

  }
   const newuser = new Users({
    email: e,
    password: pass,
    image: req.cloudinaryImageUrl,
    name: name,
  });
  await newuser.save();
  res.status(200).json({ message: "otp verified", newuser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginuser(email, password);

  const payload = {
    email: email,
    password: password,
    name: req.body.name,
  };

  const token = jwt.sign(payload, secretkey);
  res.status(200).json({ message: "user login success full", user:user,token:token });
};

export const googleauth = async (req, res) => {
  const { idToken } = req.body;
  const { email, picture, name } = await googleVerify(idToken);
  console.log(email, name);

  let user = await Users.findOne({ email });
  if (!user) {
    user = await Users.create({ email: email, name: name, image: picture });
  }
  const payload = {
    email: email,
    picture: picture,
    name: name,
  };
  const token = jwt.sign(payload, secretkey);
  console.log(token);

  res.status(200).json({ message: "user login success fulll", user:user,token:token });
};
