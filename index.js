import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import cors from "cors";
import universityRoutes from "./routes/university.route.js";


dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/universities", universityRoutes);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  
app.use(cors(corsOptions)); // add CORS middleware
  

const PORT = process.env.PORT || 3000;


//apis
app.use("/api/v1/user", userRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});






  
  