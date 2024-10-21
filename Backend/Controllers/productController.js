// const Product = require('../models/ProductModel'); 

// // Add Product
// const addProduct = async (req, res) => {
//     try {
//         const { name, image, category, price, sku, godown, gst, description, stock, ventorId } = req.body;

//         if (!name || !godown || !image || !category || !price || !sku || !gst || !description || !stock || !ventorId) {
//             return res.status(400).json({ success: false, message: 'Missing required fields' });
//         }

//         const normalizedCategory = category.toLowerCase();
//         const finalPrice = Number(price) + (Number(price) * gst / 100);
        
//         const existingProduct = await Product.findOne({ sku });
//         if (existingProduct) {
//             return res.status(400).json({ success: false, message: 'Product with this SKU already exists' });
//         }

//         if (stock > 0) {
//             const product = new Product({
//                 name, image, category: normalizedCategory, price, sku, gst, godown, description, stock, ventorId, finalPrice
//             });

//             await product.save();
//             res.json({ success: true, message: 'Product added successfully', product });
//         } else {
//             res.json({ success: false, message: 'Product is out of stock' });
//         }
//     } catch (error) {
//         console.error('Error adding product:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to add product' });
//     }
// };

// // Get Product by ID
// const getProductById = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const singleProduct = await Product.findById(productId);
//         res.json(singleProduct);
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Cannot get the single product: ' + error });
//     }
// };

// // Update Product
// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const { name, image, category, price, sku, gst, description, stock } = req.body;

//         if (!name || !image || !category || !price || !sku || !gst || !description || !stock) {
//             return res.status(400).json({ success: false, message: 'Missing required fields' });
//         }

//         const normalizedCategory = category.toLowerCase();
//         const finalPrice = Number(price) + (Number(price) * gst / 100);

//         const updatedProduct = await Product.findByIdAndUpdate(productId, {
//             name, image, category: normalizedCategory, price, sku, gst, description, stock, finalPrice
//         }, { new: true });

//         if (!updatedProduct) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }

//         res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });
//     } catch (error) {
//         console.error('Error updating product:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to update product' });
//     }
// };

// // Fetch All Products
// const getAllProducts = async (req, res) => {
//     try {
//         const allProducts = await Product.find({});
//         res.status(200).json(allProducts);
//     } catch (error) {
//         console.error('Error fetching all products:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to fetch products' });
//     }
// };

// // Delete Product
// const deleteProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const deletedProduct = await Product.findByIdAndDelete(productId);
//         if (!deletedProduct) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.json({ success: true, message: 'Product deleted successfully', deletedProduct });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error', error });
//     }
// };

// module.exports = {
//     addProduct,
//     getProductById,
//     updateProduct,
//     getAllProducts,
//     deleteProduct,
// };





// controllers/productController.js
// const Product = require('../models/Product'); // Adjust the path as necessary

const Product=require('../models/ProductModel');

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, image, category, price, sku, godown, gst, description, stock, ventorId, reorderPoint } = req.body;

        const normalizedCategory = category.toLowerCase();
        const finalPrice = Number(price) + (Number(price) * Number(gst) / 100);

        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: 'Product with this SKU already exists' });
        }

        if (stock > 0) {
            const product = new Product({
                name,
                image,
                category: normalizedCategory,
                price,
                sku,
                gst,
                godown,
                description,
                stock,
                ventorId,
                reorderPoint,
                finalPrice
            });

            await product.save();
            return res.json({ success: true, message: 'Product added successfully', product });
        } else {
            return res.json({ success: false, message: 'Out of stock product' });
        }
    } catch (error) {
        console.error('Error adding product:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to add product' });
    }
};

// Get Product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const singleProduct = await Product.findById(productId);
        if (!singleProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.json(singleProduct);
    } catch (error) {
        console.error('Cannot get single product:', error);
        return res.json({ success: false, message: 'Cannot get the single product: ' + error });
    }
};

// Edit Product
const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, image, category, price, sku, gst, description, stock } = req.body;

        const normalizedCategory = category.toLowerCase();
        const finalPrice = Number(price) + (Number(price) * Number(gst) / 100);

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                image,
                category: normalizedCategory,
                price,
                sku,
                gst,
                description,
                stock,
                finalPrice,
                reorderPoint
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to update product' });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOne = await Product.findByIdAndDelete(id);
        if (!deleteOne) {
            return res.json({ success: false, message: "Product not found" });
        }
        return res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error('Server error:', error);
        return res.json({ success: false, message: 'Server error', error });
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        return res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error fetching all products:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
};

module.exports = {
    addProduct,
    getProductById,
    editProduct,
    deleteProduct,
    getAllProducts
};
