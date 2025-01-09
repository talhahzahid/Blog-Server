import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectdb from "./src/db/index.js"
dotenv.config()
const app = express()
const port = process.env.port
import userRoutes from "./src/routes/user.routes.js"
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/user', userRoutes)
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