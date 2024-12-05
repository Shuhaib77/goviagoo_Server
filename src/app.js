import express from "express";
import connectdb from "../config/db.js";
import route from "./routes/authRoute.js";
import cors from 'cors'
import userRoute from "./routes/userRoute.js";
import destinationRoute from "./routes/destinationRoute.js";

const app=express()
app.use(cors())
app.use(express.json())

connectdb()
app.use('/api',route)
app.use('/api',userRoute)
app.use('/api',destinationRoute)





export default app