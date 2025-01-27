


import Blogs from "../models/blog.models.js"

// post blog api 

const addBlog = async (req, res) => {
    const { title, description, } = req.body;
    if (!title) return res.status(400).json({ message: "title is required" })
    if (!description) return res.status(400).json({ message: "description is required" })
    if (!req.user) return res.status(400).json({ message: "user unauthorize" })
    try {
        const userRef = req.user
        if (!userRef) return res.status(400).json({ message: "login first" })
        await Blogs.create({ title, description, userRef })
        res.status(201).json({ message: "Blog added successfully", userRef })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error in code" })
    }
}

const deletBlog = async (req, res) => {
    // if (req.user) return res.status(400).json({ message: "User authorize" })
    const { id } = req.params
    try {
        await Blogs.findByIdAndDelete(id)
        res.status(200).json({ message: "blog delete successfully" })
    } catch (error) {
        console.error(error);
    }
}

// single user all blogs api userBlogs
const singleUser = async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "user unauthorize" })
    try {
        const { _id } = req.user
        if (!_id) return res.status(400).json({ message: "Something Went Wrong" });
        const all = await Blogs.find({ userRef: _id })
        res.json({ all })
    } catch (error) {
        console.error(error);
    }
}


const allblogs = async (req, res) => {
    try {
        const data = await Blogs.find({})
        res.status(200).json({ message: "All blog fetch", data })
    } catch (error) {
        console.log(error)
    }
}



export { addBlog, singleUser, allblogs, deletBlog }
















// const singleUser = async (req, res) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "User unauthorized" });
//     }
//     try {
//       const { _id } = req.user;  // Get the user ID from req.user
//       if (!_id) {
//         return res.status(400).json({ message: "Something went wrong" });
//       }
//       // Find blogs associated with the authenticated user
//       const all = await Blogs.find({ userRef: _id });
//       res.json({ all });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" }); // Handle errors appropriately
//     }
//   };