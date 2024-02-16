const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

const sendCookies = (res, user) => {
    const token = createToken(user._id);
    res.cookie('jwt', token, {
        maxAge: 3 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === 'production'

    });
};


    const authenticateUser = (req, res, next) => {
        const token = req.signedCookies.jwt;
        if (!token) return res.status(401).json({ error: 'login is required' });
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (decodedToken) {
                req.user = { userId: decodedToken.id };
                next();
            } else {
                return res.status(401).json({ error: 'login is required' });
            }
        } catch (error) {
            return res.status(401).json({ error: 'login is required' });
        }
    };
    
    module.exports = {
      
        sendCookies,
        authenticateUser
    };
    

