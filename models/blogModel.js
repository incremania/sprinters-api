const { Schema, default: mongoose } = require('mongoose');


const blogSchema = new Schema({
    description: {
        type: String,
        required: [true, 'blog description is required']
    },
    title: {
        type: String,
        required: [true, 'blog title is required']
    },
    image: {
        type: String,
        required: [true, 'blog image is required']
    },
    content: {
        type: String,
        required: [true, 'blog content is required']
    },
    author: {
        type: String,
        required: [true, 'blog author is required']
    },
    tags: {
        type: [String]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)