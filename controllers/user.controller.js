import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 import { User } from '../models/user.model.js';
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
            const userResponse={_id:user._id,fullname:user.fullname,email:user.email,phoneNumber:user.phoneNumber,role:user.role,profile:user.profile};
            res.cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'});
            res.status(200).json({message:"Login successful",success:true});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message:"Internal server error",success:false});
        }
    }

    export const logout=async(req,res)=>{
        try{
            res.clearCookie("token");
            res.status(200).json({message:"Logout successful",success:true});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message:"Internal server error",success:false});
        }
    }
   

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ emailToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed' });
  }
};

    export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, profile } = req.body;
    const userId = req.id; // from isAuthenticated middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills.split(",").map(skill => skill.trim());

    // Safely merge profile object
    if (profile && typeof profile === "object") {
      user.profile = {
        ...user.profile, // preserve existing values
        ...profile       // overwrite with new ones
      };
    }

    await user.save();

    // Avoid reassigning a const (bug you had earlier)
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      skills: user.skills,
      profile: user.profile
    };

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser, success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }

    }
