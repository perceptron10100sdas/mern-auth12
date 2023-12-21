import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path"

dotenv.config();


mongoose.connect("mongodb+srv://Sambhavdas:iamsdasbrain@cluster0.ohjnizf.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=AtlasApp").then(()=>{console.log("connected to mongo db ")}).catch((err)=>{console.log(err)})
const app = express();
const _dirname=path.resolve();
app.use(express.static(path.join(_dirname,'/client/build')))
app.get("*",(res,req)=>{
  res.sendFile(path.join(_dirname,"client","build","index.html"))
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3001"
}))


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
app.get("/",(req,res)=>
{
  res.json({
    message:"Api is working "
  })
})
app.use('/api/user',userRoutes)
app.use("/api/auth",authRoutes)
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500
  const message=err.message || "internal server error"
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,

  });
})

