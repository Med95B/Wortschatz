import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { connectDB } from './lib/db.js'
import wordRoutes from "./routes/words.js" 
 


const app = express()
const PORT=process.env.PORT


app.use(cors())
app.use(express.json())
app.use("/words", wordRoutes)


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB()
})