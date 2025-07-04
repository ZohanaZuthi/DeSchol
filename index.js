import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
    origin: 'https://localhost:5173',
    credentials: true,
  };
  
app.use(cors(corsOptions)); // add CORS middleware
  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.get("/", (req, res) => {
    return res.status(200).json(
        {
            message: "I am coming from backend",
            success: true
        }
    )
  });


  
  