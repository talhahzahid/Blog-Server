
import express from "express";
import { addBlog, singleUser } from "../controllers/blog.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";
// import { authenticateUser } from "../middleware/user.middleware.js";
const router = express.Router()

router.post('/addblog', authenticate, addBlog)
router.get('/all', authenticate, singleUser)

export default router


