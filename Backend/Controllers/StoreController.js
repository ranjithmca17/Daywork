
const jwt = require('jsonwebtoken');
// const Store = require('../models/Store'); 
const JWT_STORE='retail_store_jwt';
const Store=require('../models/StoreModel');


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        const existingStore = await Store.findOne({ email });
        if (existingStore) {
            return res.status(400).json({ success: false, error: 'Store with this email already exists' });
        }

        const store = new Store({ name, email, password });
        await store.save();

        const token = jwt.sign({ store: { id: store._id } }, JWT_STORE, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up store:', error.message);
        res.status(500).json({ success: false, error: 'Failed to sign up store' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        const store = await Store.findOne({ email });
        if (!store) {
            return res.status(404).json({ success: false, error: 'Store not found' });
        }

        const isMatch = await store.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect password' });
        }

        const token = jwt.sign({ store: { id: store._id } }, JWT_STORE, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, error: 'Failed to log in' });
    }
};
