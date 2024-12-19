// import {User} from '../models/user.model.js';
// import bcryptjs from "bcryptjs";
// import { generateTokenAndSetCookie } from '../utils/generateToken.js';

// export async function signup(req,res){
//     try {
//         const{email, password, username} = req.body;
//         if (!email || !password|| !username){
//             return res.status(400).json({sucess:false,message:"All fields are required"})
//         }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if(!emailRegex.test(email)){
//             return res.status(400).json({success:false,message:"Invalid email"})
//         }
//         if (password.length < 6) {
//             return res.status(400).json({success:false, message:"Password must be at least six characters"})
//         }
//         const existingUserByEmail = await User.findOne({email})

//         if (existingUserByEmail){
//             return res.status(400).json({success:false, message:"Email already exists"})
//         }

//         const existingUserByUsername = await User.findOne({username})


//         if (existingUserByUsername){
//             return res.status(400).json({success:false, message:"Username already exists"})
//         }

//         //hash password
//         const salt =await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         const PROFILE_PICS =["/avatar1.png", "/avatar2.png" , "/avatar3.png"];

//         const image = PROFILE_PICS[Math.floor(Math.random()* PROFILE_PICS.length)];
        
//         const newUser = new User({
//             email,
//             password: hashedPassword,
//             username,
//             image
//         });
//         await newUser.save();
//         generateTokenAndSetCookie(newUser._id, res);
        
//         //hide password
        
//     res.status(201).json({
//         success:true,
//         user:{
//             ...newUser._doc,
//             password:"",
//         }
//     });
//     } catch (error) {
//         console.log("Error in signup controller", error.stack);
//         res.status(500).json({success: false, message: "internal server error"});
        
//     }
// } 

// export async function login(req,res){
//     try {
//         const {email,password} = req.body;
//         if(!email || !password){
//             return res.status(400).json({success:false, message:"All fields are required" });
//         }
//         const user = await User.findOne({email: email})
//         if (!user){
//             return res.status(404).json({success:false, message:"invalid credentials"});
//         }
//         const isPasswordCorrect = await bcryptjs.compare(password, user.password);

//         if(!isPasswordCorrect) {
//             return res.status(400).json({success:false, message:"Invalid Credentials"});
//         }
//         generateTokenAndSetCookie(user._id, res);
//         res.status(200).json({
//             success: true,
//             user:{
//                 ...user._doc,
//                 password:""
//             }

//         })
//     } catch (error) {
//         console.log("Error in login controller", error.stack);
//         res.status(500).json({success: false, message:"Internal server error"});
//     }
// }

// export async function logout(req,res){
//     try {
//         res.clearCookie("jwt-lightstream"),
//         res.status(200).json({success: true, message:"logged out successfully"});
//     } catch (error) {
//         console.log("Error in logout controller", error.stack);
//         res.status(500).json({success:false, message:"Internal servert error"});
//     }
// }


import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({ email, password: hashedPassword, username, image });
        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            success: true,
            user: { ...newUser._doc, password: undefined },
        });
    } catch (error) {
        console.error('Error in signup:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: { ...user._doc, password: undefined },
        });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-lightstream');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logout:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
