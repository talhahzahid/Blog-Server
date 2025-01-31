


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

// delete blog
const deletBlog = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User not logged in" });
    } const { id } = req.params
    try {
        await Blogs.findByIdAndDelete(id)
        res.status(200).json({ message: "blog delete successfully" })
    } catch (error) {
        console.error(error);
    }
}

// edit blog 
const editBlog = async (req, res) => {
    const { title, description } = req.body
    if (!req.user) return res.status(401).json({ message: "Unauthorized: User not logged in" });
    const { id } = req.params
    try {
        await Blogs.findByIdAndUpdate(id, {
            title, description
        })
        res.status(200).json({ message: "Blog update successfully" })
    } catch (error) {
        console.log(error)
    }
}

// single user all blogs api userBlogs
const singleUser = async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "user unauthorize" })
    try {
        const { _id } = req.user
        if (!_id) return res.status(400).json({ message: "Something Went Wrong" });
        const all = await Blogs.find({ userRef: _id }).populate("userRef", "id  email imageUrl")
        res.json({ all })
    } catch (error) {
        console.error(error);
    }
}

// all user blog 
const allblogs = async (req, res) => {
    try {
        const data = await Blogs.find({})
            .populate("userRef", "username email imageUrl")
            .sort({ createdAt: -1 });
        const shortenedData = data.map(blog => {
            return {
                ...blog.toObject(),
                description: blog.description.slice(0, 100) + "..."
            };
        });
        res.status(200).json({
            message: "All blogs fetched",
            data: shortenedData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching blogs" });
    }
};

// single blog find
const singleBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ data: blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export { addBlog, deletBlog, editBlog, allblogs, singleBlog, singleUser }














