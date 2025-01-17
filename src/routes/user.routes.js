

import express from "express"
import { logOut, signIn, signUp } from "../controllers/user.contollers.js"
import { upload } from "../middleware/multer.middleware.js"
import { authenticateUser } from "../middleware/user.middleware.js"

const router = express.Router()

router.post("/signup", upload.single("imageUrl"), signUp)
router.post('/signin', signIn)
router.get('/logout', logOut)

export default router
