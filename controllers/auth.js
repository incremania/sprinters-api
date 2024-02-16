const User = require('../models/userModel');
const { sendCookies } = require('../utils/token');

const register = async(req, res) => {
    try {
        const { email , password } = req.body
        if(!email || !password) {
            return res.status(400).json({ error: 'please enter email or password'})
        }
        const user = await User.create({ email, password});
        sendCookies(res, user)
        res.status(201).json({ user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

const login = async(req, res) => {
    try {
        const { email , password } = req.body
        if(!email || !password) {
            return res.status(400).json({ error: 'please enter email or password'})
        }
        const user = await User.login(email, password)
        sendCookies(res, user)
        res.status(200).json({ user })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})

    }
}

module.exports = {
    register,
    login
}