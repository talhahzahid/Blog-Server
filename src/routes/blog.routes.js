
import express from "express";
import { addBlog } from "../controllers/blog.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";

const router = express.Router()

router.post('/addblog', authenticate, addBlog)

export default router


