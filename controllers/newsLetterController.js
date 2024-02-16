const Newsletter = require('../models/newsLetterModel')


const suscribeToNewsletter = async(req, res) => {
    try {
        const existingEmail = await Newsletter.findOne({ email: req.body.email });
        if(existingEmail) {
            return res.status(400).json({msg: 'email already exist'})
        }
       await Newsletter.create(req.body)
       res.status(200).json({ msg: 'you have suscribed to newsletter succesfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

module.exports = suscribeToNewsletter
