const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is defined in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'retail_jwt_secret';

const fetchAdmin = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
        ? req.headers['authorization'].split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded.admin; // Assign the admin object from the token
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { fetchAdmin };
