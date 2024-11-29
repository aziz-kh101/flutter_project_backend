const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Authentication failed' });
    }
    const token = tokenHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Authentication failed' });
    }
};

module.exports = { isAuthenticated };