// controllers/orderController.js

const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    try {
        const { items, totalValue, totalQuantity, customerName, customerPhoneNumber, paymentType, upiId, cardNo } = req.body;

        const updatedItems = [];
        for (const item of items) {
            const { productId, quantity } = item;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
            }

            if (quantity > product.stock) {
                return res.status(400).json({ success: false, message: `Insufficient stock for product with ID ${productId}` });
            }

            product.stock -= quantity;
            await product.save();

            updatedItems.push({
                productId: product._id,
                productName: product.name,
                productPrice: product.price,
                quantity,
            });
        }

        const order = new Order({
            items: updatedItems,
            totalValue,
            totalQuantity,
            customerName,
            customerPhoneNumber,
            paymentType,
            upiId: paymentType === 'upiId' ? upiId : undefined,
            cardNo: paymentType === 'cardNo' ? cardNo : undefined,
        });

        await order.save();
        await Cart.deleteMany({});
        res.json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
};

// Other order-related functions...

module.exports = { createOrder };
