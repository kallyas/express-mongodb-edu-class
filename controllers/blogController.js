const Blog = require('../models/blog');


// GET /blogs
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).populate('createdBy', 'name email')
    res.status(200).json(blogs);
}

module.exports = {
    getAllBlogs
}