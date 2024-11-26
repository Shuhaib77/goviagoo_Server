import nodemailer from "nodemailer";
import dotenv from "dotenv";
import e from "cors";
import { registertemplate } from "../templates/nodemailertemp.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (email,subject,otp) => {
  try {
    await transporter.sendMail({
      to: email,
      subject : "welcome to the team",
      html:registertemplate(otp),
    });
    console.log(email, "ee");

    console.log("emailsend successfully");
  } catch (error) {
    console.log("error occurdd", error);
  }
};

export default sendEmail;
