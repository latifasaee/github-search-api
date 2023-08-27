const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        if (!user.approved) {
            return res.status(403).json({ error: 'Not approved for aaccess.' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized!' });
    }
};

const authorize = (role) => {
    return (req, res, next) => {
        const user = req.user;

        if (role && role.length > 0 && user.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied!' });
        }
    };
};

module.exports = {
    authenticate,
    authorize
};