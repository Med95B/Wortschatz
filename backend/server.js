import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { connectDB } from './database/db.js'
import wordRoutes from "./routes/wordRoutes.js" 
import authRoutes from "./routes/auth.js"



const app = express()
const PORT=process.env.PORT


app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/words", wordRoutes)


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB()
})