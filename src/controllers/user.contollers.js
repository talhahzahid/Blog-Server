import users from "../models/user.models.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config()
import fs from 'fs';

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
        // console.log('Cloudinary upload result:', uploadResult);
        // Remove the file after successful upload
        fs.unlinkSync(localpath);
        return uploadResult.url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        // Cleanup even if upload fails
        if (fs.existsSync(localpath)) {
            fs.unlinkSync(localpath);
        }
        return null;
    }
}

const signUp = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname) return res.status(400).json({ message: "Fullname is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    try {
        const user = await users.findOne({ email })
        if(user) return res.status(400).json({message:"User already registered"})
        const imageUrl = await uploadImageToCloudinary(req.file.path);
        console.log(imageUrl, "image again");
        const userInfo = await users.create({
            fullname,
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

export { signUp };
