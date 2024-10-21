
app.post('/order', async (req, res) => {
    try {
        const {
            items,
            totalValue,
            totalQuantity,
            customerName,
            customerPhoneNumber,
            paymentType,
            upiId,
            cardNo,
        } = req.body;

        // Basic validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Items are required and must be a non-empty array' });
        }
        if (totalValue === undefined || totalQuantity === undefined) {
            return res.status(400).json({ success: false, message: 'Total value and total quantity are required' });
        }
        if (!customerName || !customerPhoneNumber) {
            return res.status(400).json({ success: false, message: 'Customer name and phone number are required' });
        }

        const updatedItems = [];

        // Fetch and update the stock for each product in the cart
        for (const item of items) {
            const { productId, quantity } = item;

            // Find the product by ID
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
            }

            // Check if the requested quantity is available in stock
            if (quantity > product.stock) {
                return res.status(400).json({ success: false, message: `Insufficient stock for product with ID ${productId}` });
            }

            // Update product stock
            product.stock -= quantity;
            await product.save();

            // Add product details to the updated items array
            updatedItems.push({
                productId,
                productName: product.name,
                productPrice: product.price,
                quantity,
            });
        }

        // Create and save new order
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

        

        // Clear the cart after order creation
        await Cart.deleteMany({});

        res.json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});





// app.post('/order', async (req, res) => {
//     try {
//         const {
//             items,
//             totalValue,
//             totalQuantity,
//             customerName,
//             customerPhoneNumber,
//             paymentType,
//             upiId,
//             cardNo,
//         } = req.body;

//         // Basic validation
//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, message: 'Items are required and must be a non-empty array' });
//         }
//         if (totalValue === undefined || totalQuantity === undefined) {
//             return res.status(400).json({ success: false, message: 'Total value and total quantity are required' });
//         }
//         if (!customerName || !customerPhoneNumber) {
//             return res.status(400).json({ success: false, message: 'Customer name and phone number are required' });
//         }

//         const updatedItems = [];
//         const purchasePromises = [];

//         // Fetch and update the stock for each product in the cart
//         for (const item of items) {
//             const { productId, quantity } = item;

//             // Find the product by ID
//             const product = await Product.findById(productId);
//             if (!product) {
//                 return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
//             }

//             // Check if the requested quantity is available in stock
//             if (quantity > product.stock) {
//                 return res.status(400).json({ success: false, message: `Insufficient stock for product with ID ${productId}` });
//             }

//             // Update product stock
//             product.stock -= quantity;
//             await product.save();

//             // Check stock level after update
//             if (product.stock < 10) {
//                 purchasePromises.push(handleLowStock(product));
//             }

//             // Add product details to the updated items array
//             updatedItems.push({
//                 productId,
//                 productName: product.name,
//                 productPrice: product.price,
//                 quantity,
//             });
//         }

//         // Execute all purchase updates in parallel
//         await Promise.all(purchasePromises);

//         // Create and save new order
//         const order = new Order({
//             items: updatedItems,
//             totalValue,
//             totalQuantity,
//             customerName,
//             customerPhoneNumber,
//             paymentType,
//             upiId: paymentType === 'upiId' ? upiId : undefined,
//             cardNo: paymentType === 'cardNo' ? cardNo : undefined,
//         });

//         await order.save();

//         // Clear the cart after order creation
//         await Cart.deleteMany({});

//         res.json({ success: true, message: 'Order created successfully', order });
//     } catch (error) {
//         console.error('Error creating order:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to create order' });
//     }
// });

// // Function to handle low stock scenario
// async function handleLowStock(product) {
//     const vendorId = product.ventorId; // Ensure this matches your Product schema
//     const foundVendor = await Ventor.findOne({ id: vendorId });

//     if (foundVendor) {
//         console.log(`Vendor Name: ${foundVendor.name}`);
//         const message = `${product.name} stock is low (current stock: ${product.stock}). Vendor Name: ${foundVendor.name}, Vendor ID: ${vendorId}`;

//         const purchase = new Purchase({
//             productId: product._id,
//             productname: product.name,
//             vendorId,
//             VendorName: foundVendor.name,
//             message: message,
//         });
//         await purchase.save();
//     } else {
//         console.log(`Vendor with ID ${vendorId} not found.`);
//     }
// }







const express = require('express');
const router = express.Router();
const Order = require('./models/Order'); // Adjust the path based on your structure

// GET endpoint to fetch the latest order
router.get('/latest-order', async (req, res) => {
    try {
        // Fetch the latest order sorted by createdAt in descending order
        const latestOrder = await Order.findOne().sort({ createdAt: -1 }).populate('items.productId');

        if (!latestOrder) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.json({ success: true, order: latestOrder });
    } catch (error) {
        console.error('Error fetching latest order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch latest order' });
    }
});

module.exports = router;
