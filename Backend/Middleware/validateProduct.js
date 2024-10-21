// middleware/validateProduct.js
const validateProduct = (req, res, next) => {
    const { name, image, category, price, sku, godown, gst, description, stock, ventorId } = req.body;
    
    if (!name || !godown || !image || !category || !price || !sku || !gst || !description || !stock || !ventorId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    next();
};

module.exports = validateProduct;
