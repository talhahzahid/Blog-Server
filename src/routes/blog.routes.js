
import express from "express";
import { addBlog, allblogs, singleUser } from "../controllers/blog.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";
// import { authenticateUser } from "../middleware/user.middleware.js";
const router = express.Router()

router.post('/addblog', authenticate, addBlog)
router.get('/all', authenticate, singleUser)
router.get('/alluser', allblogs)

export default router


