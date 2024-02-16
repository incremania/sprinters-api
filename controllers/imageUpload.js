const cloudinary = require('cloudinary').v2;
const Blog = require('../models/blogModel')
const CaseStudy = require('../models/caseStudyModel')


const blogImageUpload = async(req, res) => {
    try {
      if(!req.files) {
        return res.status(400).json({ error: 'Please provide a valid image for update.' });

      }
      
      const blogImage = req.files.image
      
     
      // check if image exist
      if (!blogImage || !blogImage.tempFilePath) {
        return res.status(400).json({ error: 'Please provide a valid image for post.' });
    }

    // Check for MIME type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
    if (!allowedMimeTypes.includes(blogImage.mimetype)) {
        return res.status(400).json({ error: 'Only JPEG, PNG, and GIF images are allowed.' });
    }
    const result = cloudinary.uploader.upload(blogImage.tempFilePath, {
      use_filename: true,
      folder: 'sprinters_blog_image'
    })
    res.status(200).json({ image: {src: (await result).secure_url}})
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message})
    }
  }

  
  const updateBlogImage = async (req, res) => {
      try {
          const blogId = req.params.blogId; 

          if(!req.files) {
            return res.status(400).json({ error: 'Please provide a valid image for update.' });
 
          }

          const blogImage = req.files.image;

          if (!blogImage || !blogImage.tempFilePath) {
            return res.status(400).json({ error: 'Please provide a valid image for update.' });
        }

        // Check for MIME type
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
        if (!allowedMimeTypes.includes(blogImage.mimetype)) {
            return res.status(400).json({ error: 'Only JPEG, PNG, and GIF images are allowed.' });
        }
          // Upload the new image to Cloudinary
          const result = await cloudinary.uploader.upload(blogImage.tempFilePath, {
              use_filename: true,
              folder: 'sprinters_blog_image'
          });
          const updatedBlog = await Blog.findByIdAndUpdate(blogId, { image: result.secure_url }, { new: true });
  
          res.status(200).json({ message: "Blog image updated successfully", blog: updatedBlog });
      } catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
      }
  };

  const caseStudyImageUpload = async(req, res) => {
    try {
      
      if(!req.files) {
        return res.status(400).json({ error: 'Please provide a valid image for update.' });

      }
      const caseStudyImage = req.files.coverPhoto

      
      // check if image exist
      if (!caseStudyImage || !caseStudyImage.tempFilePath) {
        return res.status(400).json({ error: 'Please provide a valid image for update.' });
    }

    // Check for MIME type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
    if (!allowedMimeTypes.includes(caseStudyImage.mimetype)) {
        return res.status(400).json({ error: 'Only JPEG, PNG, and GIF images are allowed.' });
    }
    const result = cloudinary.uploader.upload(caseStudyImage.tempFilePath, {
      use_filename: true,
      folder: 'sprinters_case_Study'
    })
    res.status(200).json({ image: {src: (await result).secure_url}})
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message})
    }
  }

  const caseStudyImageUpdate = async (req, res) => {
    try {
        const caseStudyId = req.params.caseStudyId; 

        if(!req.files) {
          return res.status(400).json({ error: 'Please provide a valid image for update.' });

        }

        const caseStudyImage = req.files.coverPhoto;

        if (!caseStudyImage || !caseStudyImage.tempFilePath) {
          return res.status(400).json({ error: 'Please provide a valid image for update.' });
      }

      // Check for MIME type
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
      if (!allowedMimeTypes.includes(caseStudyImage.mimetype)) {
          return res.status(400).json({ error: 'Only JPEG, PNG, and GIF images are allowed.' });
      }
        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(caseStudyImage.tempFilePath, {
            use_filename: true,
            folder: 'sprinters_case_Study'
        });
        const updatedcaseStudy = await CaseStudy.findByIdAndUpdate(caseStudyId, { coverPhoto: result.secure_url }, { new: true });

        res.status(200).json({ message: "caseStudy image updated successfully", caseStudy: updatedcaseStudy });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

  

module.exports = {
    updateBlogImage,
    blogImageUpload,
    caseStudyImageUpload,
    caseStudyImageUpdate
};


