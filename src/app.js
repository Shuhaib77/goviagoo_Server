import express from "express";
import connectdb from "../config/db.js";
import route from "./routes/authRoute.js";
import cors from 'cors'

const app=express()
app.use(cors())
app.use(express.json())

connectdb()
app.use('/api',route)





export default app