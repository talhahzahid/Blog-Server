import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectdb from "./src/db/index.js"
import protectRoutes from "./src/middleware/protected.middleware.js"
dotenv.config()
const app = express()
const port = process.env.port
import userRoutes from "./src/routes/user.routes.js"
import router from "./src/routes/blog.routes.js"
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions))
app.use(urlencoded({ extended: false }))
app.use(express.json())
app.get('/protected', protectRoutes, (req, res) => {
    res.json({ message: 'You have access to this protected route!', user: req.user });
});
app.use(cookieParser())
app.use('/user', userRoutes)
app.use('/api/v1', router)
app.get('/', (req, res) => {
    res.send("Blogging App Server")
})

connectdb()
    .then(() => {
        app.listen(process.env.port, () => {
            console.log("Server Is Running At Port", process.env.port);
        })
    })
    .catch((err) => {
        console.log(err);
    })