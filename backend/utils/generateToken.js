import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/enVars.js";

export const generateTokenAndSetCookie =(userId, res) => {
   const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, { expiresIn: "15d"});
   res.cookie("jwt-lightstream", token,{
       maxAge: 15 * 24* 60 * 60 * 1000, // 15 dys in ms 
       httpOnly:true, // prevent xss attacks cross-site scripting attacks, make it not be accessible by js
       sameSite: "strict",// CSFR attacks cross-site reuest forgery attacks 
       secure: ENV_VARS.NODE_ENV !== "development"
   });
   return token;
};