import users from "../models/user.models.js";
import dotenv from "dotenv";
dotenv.config()
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN,
        { expiresIn: '2h' }
    );
};
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET,
        { expiresIn: '7d' }
    );
};


const uploadImageToCloudinary = async (localpath) => {
    console.log('Uploading image from path:', localpath);
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
    });
    try {
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto",
        });
        fs.unlinkSync(localpath);
        return uploadResult.url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        if (fs.existsSync(localpath)) {
            fs.unlinkSync(localpath);
        }
        return null;
    }
}

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username) return res.status(400).json({ message: "username is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    try {
        const user = await users.findOne({ email })
        if (user) return res.status(400).json({ message: "User already registered" })
        const imageUrl = await uploadImageToCloudinary(req.file.path);
        console.log(imageUrl, "image again");
        const userInfo = await users.create({
            username,
            email,
            password,
            imageUrl,
        });

        console.log(userInfo);
        res.status(201).json({ message: "Registered Successfully", userInfo });
    } catch (error) {
        res.status(400).json({ message: "Error Occurred", error });
    }
};

// signIn

const signIn = async (req, res) => {
    const { email, password } = req.body
    if (!email) return res.status(400).json({ message: "email is required" })
    if (!password) return res.status(400).json({ message: "password is required" })
    try {
        const user = await users.findOne({ email })
        if (!user) return res.status(400).json({ message: "no user found try to use different email" })
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).json({ message: "incorrect password" })
        const refreshToken = generateRefreshToken(user)
        const accessToken = generateAccessToken(user)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        res.status(200).json({ message: "login successfully", refreshToken, accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

// logOut 

const logOut = async (req, res) => {
    try {
        res.clearCookie("refreshToken")
        res.status(200).json({ message: "logot successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}

export { signUp, signIn, logOut };
