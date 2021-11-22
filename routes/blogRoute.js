const { Router } = require('express');
const router = Router();


const { createBlog, getAllBlogs, getBlogById, getBlogsByUser, deleteBlog, updateBlog } = require('../controllers/blogController');
const { authenticateUser, checkUser, authorizeRoles} = require("../middlewares/authenticateUser")


router.post('/blog', authenticateUser, createBlog);
router.get('/blogs', authenticateUser, authorizeRoles("admin"), getAllBlogs);
router.get('/blogs/:id', authenticateUser, getBlogById);
router.get('/blogs/user/:id', authenticateUser, checkUser, getBlogsByUser);
router.put('/blogs/:id', authenticateUser, checkUser, updateBlog);
router.delete('/blogs/:id', authenticateUser, checkUser, deleteBlog);

module.exports = router;