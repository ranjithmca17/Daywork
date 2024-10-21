// const Cart = require('../models/CartModel'); // Adjust path accordingly

const Cart=require('../models/Cart');

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
        }

        const cartItem = new Cart({ productId, quantity });
        await cartItem.save();
        res.json({ success: true, message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add to cart' });
    }
};

// Get All Cart Items
const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({}).populate('productId', 'name price');
        res.json({ success: true, cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch cart items' });
    }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ success: false, message: 'Quantity is required' });
        }

        const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, { quantity }, { new: true });
        if (!updatedCartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        res.json({ success: true, message: 'Cart item updated', updatedCartItem });
    } catch (error) {
        console.error('Error updating cart item:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update cart item' });
    }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);
        if (!deletedCartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        res.json({ success: true, message: 'Cart item deleted', deletedCartItem });
    } catch (error) {
        console.error('Error deleting cart item:', error.message);
        res.status(500).json({ success: false, message: 'Failed to delete cart item' });
    }
};

module.exports = {
    addToCart,
    getAllCartItems,
    updateCartItem,
    deleteCartItem,
};
