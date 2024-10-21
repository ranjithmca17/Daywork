// const express = require('express');
// const {
//     addProduct,
//     getProductById,
//     updateProduct,
//     getAllProducts,
//     deleteProduct,
// } = require('../Controllers/productController');

// const productRouter = express.Router();

// productRouter.post('/add', addProduct);
// productRouter.get('/:id', getProductById);
// productRouter.put('/edit/:id', updateProduct);
// productRouter.get('/all', getAllProducts);
// productRouter.delete('/delete/:id', deleteProduct);

// module.exports = productRouter;



// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const validateProduct = require('../Middleware/validateProduct');
const {
    addProduct,
    getProductById,
    editProduct,
    deleteProduct,
    getAllProducts
} = require('../Controllers/productController');

// Routes
router.post('/addproduct', validateProduct, addProduct);
router.get('/getproduct/:id', getProductById);
router.put('/edit/:id', validateProduct, editProduct);
router.delete('/allproduct/delete/:id', deleteProduct);
router.get('/allproducts', getAllProducts);

module.exports = router;




