const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator')

const newsLetterSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [isEmail, 'please enter a valid email'],
    }
}, 

{timestamps: true}
)

module.exports = mongoose.model('Newsletter', newsLetterSchema)