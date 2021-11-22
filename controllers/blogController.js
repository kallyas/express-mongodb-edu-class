const Blog = require('../models/blog');


// GET /blogs
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).populate('createdBy', '-password')
    res.status(200).json(blogs);
}

// create blog post
const createBlog = async (req, res) => {
    //validate body
    const { title, body } = req.body;
    const createdBy = req.user.id

    const blog = new Blog({title, body, createdBy});
    const result = await blog.save();
    res.status(201).json(result);
}

// update blog post findByIdAndUpdate()
const updateBlog = async (req, res) => {
    //validate body
    const { title, body } = req.body;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({message: 'Blog not found'});
    
   
    //update
    if(title) blog.title = title;
    if(body) blog.body = body;
    const result = await blog.save();
    res.status(200).json(result);
}

// delete blog post findByIdAndDelete()
const deleteBlog = async (req, res) => {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({message: 'Blog not found'});
    
    //remove() deleteOne() deleteMany()
    const result = await Blog.deleteOne({_id: blogId});
    res.status(200).json({message: 'Blog deleted'});

}

// get blog post by id
const getBlogById = async (req, res) => {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({message: 'Blog not found'});
    res.status(200).json(blog);
}

//get blogs by user
const getBlogsByUser = async (req, res) => {
    const userId = req.params.id
    const blogs = await Blog.find({createdBy: userId})
    if (!blogs) return res.status(404).json({message: 'Blog not found'});
    res.status(200).json(blogs);
}

module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getBlogsByUser
}