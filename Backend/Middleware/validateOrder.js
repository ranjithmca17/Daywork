// middleware/validationMiddleware.js

const validateOrder = (req, res, next) => {
    const {
        items,
        totalValue,
        totalQuantity,
        customerName,
        customerPhoneNumber,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Items are required and must be a non-empty array' });
    }
    if (totalValue === undefined || totalQuantity === undefined) {
        return res.status(400).json({ success: false, message: 'Total value and total quantity are required' });
    }
    if (!customerName || !customerPhoneNumber) {
        return res.status(400).json({ success: false, message: 'Customer name and phone number are required' });
    }

    next();
};

const validateProduct = (req, res, next) => {
    const { productId, productName, productPrice, category, gst, sku } = req.body;

    if (!productId || !productName || !productPrice || !category || !gst || !sku) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    next();
};

module.exports = { validateOrder, validateProduct };
