

import express from "express"
import { logOut, signIn, signUp, singleUser, updateProfile, user } from "../controllers/user.contollers.js"
import { upload } from "../middleware/multer.middleware.js"
import { authenticateUser } from "../middleware/user.middleware.js"
// import { authenticate } from "../middleware/userRef.middleware.js"
const router = express.Router()

router.post("/signup", upload.single("imageUrl"), signUp)
router.post('/signin', signIn)
router.get('/logout', logOut)
router.get('/data', user)
router.get('/user/:id', singleUser)
router.put('/update/:id', updateProfile)
router.get("/verifyUser", authenticateUser, (req, res) => {
    res.json({ message: "Hey! You Are Logged In", user: req.user });
});

export default router
