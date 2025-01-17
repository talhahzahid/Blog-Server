


import mongoose from "mongoose";
import Users from "../models/user.models.js"
import Blogs from "../models/blog.models.js"

const userComment = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    },
    comment: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Comments")