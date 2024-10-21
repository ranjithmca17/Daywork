const Vendor = require('../models/Ventor');
// Add Vendor
const addVendor = async (req, res) => {
    try {
        const { name, contactInfo } = req.body;

        if (!name || !contactInfo) {
            return res.status(400).json({ success: false, message: 'Name and contact information are required' });
        }

        const vendor = new Vendor({ name, contactInfo });
        await vendor.save();
        res.json({ success: true, message: 'Vendor added successfully', vendor });
    } catch (error) {
        console.error('Error adding vendor:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add vendor' });
    }
};

module.exports = {
    addVendor,
};
