const express = require('express');
const router = express.Router();
const { createBlog,
        getAllBlogs,
        getSingleBlog,
        deleteBlog,
        updateBlog
       } = require('../controllers/blogController')
const { blogImageUpload, updateBlogImage } = require('../controllers/imageUpload')
const { authenticateUser } = require('../utils/token')


router
.post('/', authenticateUser, createBlog)
.post('/image',authenticateUser, blogImageUpload)
.get('/all',  getAllBlogs)
.get('/:blogId', getSingleBlog)
.patch('/:blogId',authenticateUser, updateBlog)
.patch('/:blogId/image', authenticateUser, updateBlogImage)
.delete('/:blogId', authenticateUser, deleteBlog)


module.exports = router