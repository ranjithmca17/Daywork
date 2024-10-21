const Admin = require('../models/AdminModel'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'retail_jwt_secret';

const AdminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, error: 'Admin with this email already exists' });
        }

        const admin = new Admin({ name, email, password });
        await admin.save();

        const token = jwt.sign({ admin: { id: admin._id } }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up admin:', error.message);
        res.status(500).json({ success: false, error: 'Failed to sign up admin' });
    }
};

const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, error: 'Admin not found' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect password' });
        }

        const token = jwt.sign({ admin: { id: admin._id } }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, error: 'Failed to log in' });
    }
};

module.exports = { AdminSignup, AdminLogin };
