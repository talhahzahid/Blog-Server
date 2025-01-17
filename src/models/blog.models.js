

import mongoose from "mongoose";
import Users from "../models/user.models.js"
const blogSchema = mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }]
}, { timestamps: true })

export default mongoose.model("Blogs", blogSchema)