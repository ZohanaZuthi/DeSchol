import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser=async(req,res)=>{
    try {
        const {fullname,email,password,phoneNumber,role}=req.body;
        if(!fullname || !email || !password || !phoneNumber || !role){
            return res.status(400).json({message:"All fields are required",success:false});
        };
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists", success:false});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({fullname,email,password:hashedPassword,phoneNumber,role});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        console.error(error);        
        res.status(500).json({message:"Internal server error"});
    }
}
    export const login=async(req,res)=>{
        try{
            const{email,password,role}=req.body;
            if(!email || !password || !role){
                return res.status(400).json({message:"All fields are required",success:false});
            }
            const user=await User.findOne({email,role});
            if(!user){
                return res.status(404).json({message:"User not found",success:false});
            }
            const isPasswordValid=await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(401).json({message:"Invalid credentials",success:false});
            }
            
            const tokenData={userId:user._id};
            const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
            res.cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'});
            res.status(200).json({message:"Login successful",success:true});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message:"Internal server error",success:false});
        }
    }
