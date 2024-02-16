const Blog = require('../models/blogModel');
// create Blog

const createBlog = async (req, res) => {
    try {
      req.body.user = req.user.userId
      const blog = await Blog.create(req.body);
      res.status(201).json({ blog })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json({  nbHits: blogs.length,blogs})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

const getSingleBlog = async (req, res) => {
    try {
       const { blogId } = req.params;
       const blog = await Blog.findById(blogId)
       if(!blog) return res.status(404).json({ error: `no blog with id  ${blogId}`})

       res.status(200).json({ blog }) 
    } catch (error) {
        res.status(500).json({ error })
    }  
}

const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findByIdAndUpdate(blogId, req.body, {
            new: true,
            runValidators: true
        })
        if(!blog) return res.status(404).json({ error: `no blog with id  ${blogId}`})

        res.status(200).json({ blog })
    } catch (error) {
        console.log(error);
    }

}

const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findByIdAndDelete(blogId);
        if(!blog) return res.status(404).json({ error: `no blog with id  ${blogId}`})
        res.status(500).json({ msg: 'blog deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createBlog,
    getSingleBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog

}