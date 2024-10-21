const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('./models/ProductModel');
const Admin = require('./models/AdminModel');
const Order = require('./models/OrderModel');
const Cart=require("./models/Cart");
const Ventor=require('./models/Ventor');
const Purchase=require("./models/PurchaseOrder");
const WareHouse=require("./models/GoodsTransfer");
// Create Express app
const Store=require('./models/StoreModel');
const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'retail_jwt_secret';
const JWT_STORE='retail_store_jwt';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://food:7806872931@cluster0.zrjn50v.mongodb.net/retail')
// mongoose.connect('mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/retail')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Image Storage Setup with Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'upload/images'),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Serving uploaded images statically
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Image Upload Endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


// User Signup Endpoint
app.post('/store/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingStore = await Store.findOne({ email });
        if (existingStore) {
            return res.status(400).json({ success: false, error: 'store with this email already exists' });
        }

        // Create and save new store
        const store = new Store({ name, email, password });
        await store.save();

        // Generate JWT token
        const token = jwt.sign({ store: { id: store._id } }, JWT_STORE, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up store:', error.message);
        res.status(500).json({ success: false, error: 'Failed to sign up store' });
    }
});

// User Login Endpoint
app.post('/store/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        // Find store by email
        const store = await Store.findOne({ email });
        if (!store) {
            return res.status(404).json({ success: false, error: 'store not found' });
        }

        // Compare password
        const isMatch = await store.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ store: { id: store._id } }, JWT_STORE, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, error: 'Failed to log in' });
    }
});


// Middleware to fetch admin from token
const fetchStore = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
        ? req.headers['authorization'].split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_STORE);
        req.store = decoded.store; // Assign the admin object from the token
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Store Token Verification Endpoint
app.get('/store/verify-token', fetchStore, (req, res) => {
    res.json({ success: true, user: req.store });
});



// Add Product Endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, category, price, sku,godown, gst, description, stock,ventorId } = req.body;

        // Basic validation
        if (!name ||!godown || !image || !category || !price || !sku || !gst || !description || !stock||!ventorId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        // Normalize category
        const normalizedCategory = category.toLowerCase();

        // Calculate final price
        const finalPrice = Number(price) + Number(price * gst / 100);

        // Check if SKU already exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: 'Product with this SKU already exists' });
        }

        if(stock>0){
        // Create and save new product
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
            finalPrice
        });

        await product.save();
        res.json({ success: true, message: 'Product added successfully', product });
    }
    else{
        res.json({ success: false, message: 'out of stock product' });

    }
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
});
//Admin Product get values in Product Id
app.get('/getproduct/:id',async (req,res)=>{
    try{
    let productId=req.params.id;
    let singleProduct= await Product.findById(productId);
    res.json(singleProduct);
    }catch(error){
        res.json({success:false,message:'cannot get the single product : '+error});
        console.log("cannot get single product : "+error);
        
    }

})
 
app.put('/edit/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, image, category, price, sku, gst, description, stock } = req.body;

        // require all values 
        if (!name || !image || !category || !price || !sku || !gst || !description || !stock) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const normalizedCategory = category.toLowerCase();

        // Calculate final price add gst value
        const finalPrice = Number(price) + Number(price * gst / 100);

        // Find and update the product
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
                finalPrice
            },
          
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update product' });
    }
});


// User Signup Endpoint
app.post('/admin/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, error: 'Admin with this email already exists' });
        }

        // Create and save new admin
        const admin = new Admin({ name, email, password });
        await admin.save();

        // Generate JWT token
        const token = jwt.sign({ admin: { id: admin._id } }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up admin:', error.message);
        res.status(500).json({ success: false, error: 'Failed to sign up admin' });
    }
});



// User Login Endpoint
app.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, error: 'Admin not found' });
        }

        // Compare password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ admin: { id: admin._id } }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, error: 'Failed to log in' });
    }
});

// Middleware to fetch admin from token
const fetchAdmin = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
        ? req.headers['authorization'].split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded.admin; // Assign the admin object from the token
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Admin Token Verification Endpoint
app.get('/admin/verify-token', fetchAdmin, (req, res) => {
    res.json({ success: true, user: req.admin });
});


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
                productId: product._id, // Store the product ID directly
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

        // Log productId values from the newly created order
        order.items.forEach(item => {
            console.log(item.productId); 
        });

        // Clear the cart after order creation
        await Cart.deleteMany({});

        res.json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});






app.get('/latest-order', async (req, res) => {
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



app.post('/addtobill', async (req, res) => {
    try {
        const { productId, productName, productPrice, category, gst, sku, quantity = 1 } = req.body;

        // Validate required fields
        if (!productId || !productName || !productPrice || !category || !gst || !sku) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Find the product by SKU
        const product = await Product.findOne({ sku });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found with the given SKU' });
        }

        // Check if the requested quantity is within the available stock
        // Get the current cart item if it exists
        let cartItem = await Cart.findOne({ sku });

        // Calculate the total quantity in the cart including the new quantity
        const totalQuantityInCart = cartItem ? cartItem.quantity + quantity : quantity;

        // Check if the total quantity in the cart is less than or equal to the product stock
        if (totalQuantityInCart > product.stock) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        if (cartItem) {
            // Product exists in the cart, update its quantity
            cartItem.quantity = totalQuantityInCart; // Update with total quantity
            await cartItem.save();
            res.json({ success: true, message: 'Product quantity updated successfully', cart: cartItem });
        } else {
            // Create a new cart entry
            const cart = new Cart({
                productId: product._id, // Store productId as ObjectId from Product
                productName,
                productPrice,
                category,
                gst,
                quantity,
                sku
            });
            await cart.save();
            res.json({ success: true, message: 'Product added to bill successfully', cart });
        }

    } catch (error) {
        console.error('Error adding product to bill:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add product to bill' });
    }
});

app.post('/goods/transfer', async (req, res) => {
    try {
        const {
            orderNo, date, reason, sourceWarehouse, destinationWarehouse, 
            itemDetail, currentAvailability, destinationAvailability, transferQuantity
        } = req.body;

        // Validate required fields
        if (!orderNo || !date || !reason || !sourceWarehouse || !destinationWarehouse ||
            !itemDetail || transferQuantity === undefined || 
            currentAvailability === undefined || destinationAvailability === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

//find samename products in all godowns
        const firstProduct= await Product.findOne({ name: itemDetail,godown:sourceWarehouse });

console.log("firstProduct : ",firstProduct);

const secondProduct= await Product.findOne({ name: itemDetail,godown:destinationWarehouse });

console.log(secondProduct);


        // Find the product in the source warehouse
        const productInSource = await Product.findOne({ name: itemDetail, godown: sourceWarehouse });
        if (!productInSource) {
            return res.status(404).json({ success: false, message: `Product ${itemDetail} not found in source warehouse ${sourceWarehouse}` });
        }

        // Check if the transfer quantity is available in the source warehouse
        if (Number(transferQuantity) > productInSource.stock) {
            return res.status(400).json({ success: false, message: `Insufficient stock in source warehouse ${sourceWarehouse}` });
        }

        // Update stock in the source warehouse
        productInSource.stock -= Number(transferQuantity);
        await productInSource.save();

        // Find or create product in the destination warehouse
        let productInDestination = await Product.findOne({ name: itemDetail, godown: destinationWarehouse });
        if (productInDestination) {
            // Update existing product stock in destination warehouse
            productInDestination.stock += Number(transferQuantity);
            await productInDestination.save();
        } else{
            res.json({success:false,message:"the productInDestination is not Found Please Enter correct Destination value"})
        }

        // Create a new Warehouse entry to record the transfer
        const wareHouse = new WareHouse({
            orderNo,
            date,
            reason,
            sourceWarehouse,
            destinationWarehouse,
            itemDetail,
            currentAvailability,
            destinationAvailability,
            transferQuantity
        });
        await wareHouse.save();

        // Respond with success message
        res.json({ success: true, message: 'Product transferred successfully' });
    } catch (error) {
        console.error('Error transferring goods:', error.message);
        res.status(500).json({ success: false, message: 'Failed to transfer goods' });
    }
});

app.post('/addventor',async (req,res)=>{
    try{
const {id,name,address,phone,email}=req.body;
// console.log(id,name,address,phone,email);

if(!id||!name||!address||!phone||!email){
    return res.json({success:false,message:"Missing Required fields"});
}
const ventorId=await Ventor.findOne({id:id});
const ventoEmail=await Ventor.findOne({email});
if(ventorId){
    return res.json({success:false,message:'ventor Id is Already exists'});
}else if(ventoEmail){
    return res.json({success:false,message:'ventor Email is Already exists'});
}
const ventor=new Ventor({id,name,address,phone,email});

await ventor.save();

res.json({success:true,ventor})
    }catch(error){
res.json({success:false,message:"ventor detail server error ",error});
    }
})

// Fetch All Cart Items Endpoint
app.get('/getall/Cartproducts', async (req, res) => {
    try {
        const cartItems = await Cart.find({});
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch cart items' });
    }
});

app.get('/getOnchangeValue', async (req, res) => {
    try {
        // Extract query parameters
        const { name, sourceWarehouse, destinationWarehouse } = req.query;

        // Validate required parameters
        if (!name || !sourceWarehouse || !destinationWarehouse) {
            return res.status(400).json({ success: false, message: 'Missing required query parameters' });
        }

        // Fetch the product details from the source warehouse
        const productInSource = await Product.findOne({ name, godown: sourceWarehouse });
        if (!productInSource) {
            return res.status(404).json({ success: false, message: `Product '${name}' not found in source warehouse '${sourceWarehouse}'` });
        }

        // Fetch the product details from the destination warehouse
        const productInDestination = await Product.findOne({ name, godown: destinationWarehouse });
        
        res.json({
            success: true,
            sourceProduct: {
                stock: productInSource.stock,
                // You can include additional details if needed
            },
            destinationProduct: productInDestination ? {
                stock: productInDestination.stock,
                // You can include additional details if needed
            } : null
        });
    } catch (error) {
        console.error('Error in /getOnchangeValue:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/todaySales', async (req, res) => {
    try {
        let today = new Date();
        // Set the time to the beginning of the day
        today.setHours(0, 0, 0, 0);
        
        // Get today's sales by filtering orders
        let totalOrders = await Order.find({});
        let todaySales = totalOrders.filter(order => {
            let orderDate = new Date(order.createdAt);
            return orderDate >= today && orderDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        });

        res.json({ success: true, message: todaySales });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sales data', error });
    }
});


app.get('/allproducts', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error fetching all products:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
});

app.put('/updateCartItem/:id', async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;

        // Validate request parameters and body
        if (!cartItemId || quantity === undefined) {
            return res.status(400).json({ success: false, message: 'Cart item ID and quantity are required' });
        }

        // Ensure quantity is a positive number
        if (quantity < 1) {
            return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
        }

        // Find the cart item
        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        // Find the product associated with the cart item
        const product = await Product.findById(cartItem.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if the requested quantity is available in stock
        if (quantity > product.stock) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }

        // Update the cart item quantity and save it
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ success: true, message: 'Cart item updated successfully', cartItem, product });
    } catch (error) {
        console.error('Error updating cart item:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update cart item' });
    }
});
app.delete('/single/product/:id',async (req,res)=>{

    try{
    const id=req.params.id;
   
    const deleteSingleProduct=await Cart.findByIdAndDelete(id);

    if(!deleteSingleProduct){
        return res.json({success:false,message:"product Not found"})
    }
    res.json({success:true,message:'product deleted successfully : ',deleteSingleProduct});

    }catch(error){
        res.json({success:false,message:'server error',error})
    }

})

app.delete('/allproduct/delete/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const deleteOne=await Product.findByIdAndDelete(id);
        if(!deleteOne){
            return res.json({success:false,message:"Product Not Found"});
        }
        res.json({success:true,message:"product deleted in success fully"});
    }catch(error){
        res.json({success:false,message:'server error',error});
    }
})

app.get('/orders/byPhoneNumber', async (req, res) => {
    const { phoneNumber } = req.query;

    // Validate phoneNumber
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    try {
        // Find orders by phone number
        const orders = await Order.find({ customerPhoneNumber: phoneNumber }).populate({
            path: 'items.productId',
            select: 'name price'  // Fetch product name and price
        });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for the provided phone number' });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
});

app.get("/fetch/graph",async (req,res)=>{
    try{
      const date = new Date();
// Subtract 7 days
date.setDate(date.getDate() - 7);
const allOders=await Order.find({});

if(!allOders){
    return res.json({success:false,message:"Values not Found"});
}
res.json({success:true,message:allOders});
        
    }catch(error){
        res.json({success:false,message:"server error ",error})
    }
})

app.get('/getname/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.json({ success: true, admin });
    } catch (error) {
        console.error('Error fetching admin:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch admin' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



