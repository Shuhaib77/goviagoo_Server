import express from "express";
import connectdb from "../config/db.js";
import route from "./routes/authRoute.js";
import cors from 'cors'
import userRoute from "./routes/userRoute.js";
import destinationRoute from "./routes/destinationRoute.js";
import AccommadationRote from "./routes/accommadationRoute.js";
import foodRoute from "./routes/foodRoute.js";

const app=express()
app.use(cors())
app.use(express.json())

connectdb()
app.use('/api',route)
app.use('/api',userRoute)
app.use('/api',destinationRoute)
app.use('/api',AccommadationRote)
app.use('/api',foodRoute)





export default app