

import express from "express"
import { signUp } from "../controllers/user.contollers.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/signup", upload.single("imageUrl"), signUp)

export default router
