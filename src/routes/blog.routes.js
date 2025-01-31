
import express from "express";
import { addBlog, allblogs, deletBlog, editBlog, singleBlog, singleUser } from "../controllers/blog.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";
// import { authenticateUser } from "../middleware/user.middleware.js";
const router = express.Router()

router.post('/addblog', authenticate, addBlog)
router.delete('/delete/:id', authenticate, deletBlog)
router.put('/edit/:id', authenticate, editBlog)
router.get('/all', authenticate, singleUser)
router.get('/alluser', allblogs)
router.get("/singleblog/:id", singleBlog)
export default router


