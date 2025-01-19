


import Blogs from "../models/blog.models.js"

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



export { addBlog, singleUser }