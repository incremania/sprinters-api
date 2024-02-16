const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [9, 'Password must be at least 9 characters long']
    }
},{
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error('Incorrect email');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Incorrect password');
        }
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password

        return userWithoutPassword;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = mongoose.model('User', UserSchema);
