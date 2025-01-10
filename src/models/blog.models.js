

import mongoose from "mongoose";
import Users from "../models/user.models.js"
const blogSchema = mongoose.Schema({
    userId: {
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
})

export default mongoose.model("Blogs", blogSchema)