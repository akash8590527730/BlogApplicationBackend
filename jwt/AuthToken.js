import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"

const createTokenAndSaveCookies = async(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"10d"
    })
    res.cookie("jwt",token,{
        httpOnly:false,
        secure:true,
        sameSite:"none"
    })
    await User.findByIdAndUpdate(userId,{token})
    return token;
}
export default createTokenAndSaveCookies