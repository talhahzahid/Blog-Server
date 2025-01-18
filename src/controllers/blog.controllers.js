


import Blogs from "../models/blog.models.js"


const addBlog = async (req, res) => {
    const { title, description, userRef } = req.body;
    if (!title) return res.status(400).json({ message: "title is required" })
    if (!description) return res.status(400).json({ message: "description is required" })
    if (!req.user) return res.status(400).json({ message: "user unauthorize" })
    try {
        // const userRef = req.user
        // if (!userRef) return res.status(400).json({ message: "login first" })
        await Blogs.create({ title, description, userRef })
        res.status(201).json({ message: "Blog added successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error in code" })
    }
}

const deleteBlog = async (req, res) => {
    try {

    } catch (error) {

    }
}



export { addBlog }