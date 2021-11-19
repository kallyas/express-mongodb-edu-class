const { Router } = require('express');
const router = Router();


const { getAllBlogs } = require('../controllers/blogController');

router.get('/blogs', getAllBlogs);

module.exports = router;