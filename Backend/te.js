this is the cart product order code rewrite it 
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
      const purchasePromises = [];

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
              return res.status(400).json({ success: false, message: `Insufficient stock for product with ID ${productId}. Available: ${product.stock}, Requested: ${quantity}` });
          }

          // Update product stock
          product.stock -= quantity;
          await product.save();

          // Check stock level after update
          if (product.stock < product.reorderPoint) {
              purchasePromises.push(handleLowStock(product));
          }

          // Add product details to the updated items array, including reorderPoint
          updatedItems.push({
              productId: product._id,
              productName: product.name,
              productPrice: product.price,
              quantity,
              reorderPoint: product.reorderPoint // Ensure reorderPoint is included
          });
      }
      
      // Execute all purchase updates in parallel
      await Promise.all(purchasePromises);

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
async function handleLowStock(product) {
  const vendorId = product.ventorId; // Ensure this matches your Product schema
  const foundVentor = await Ventor.findOne({ id: vendorId });

  if (foundVentor) {
      console.log(`Ventor Name: ${foundVentor.name}`);
      const message = `${product.name} stock is low (current stock: ${product.stock}). Ventor Name: ${foundVentor.name}, Ventor ID: ${vendorId}`;

      const purchase = new Purchase({
          productId: product._id,
          productname: product.name, // Ensure this matches the Purchase schema
          vendorId, // Correct field name
          VendorName: foundVentor.name, // Ensure this matches the Purchase schema
          message: message,
      });

      await purchase.save();
  } else {
      console.log(`Ventor with ID ${vendorId} not found.`);
  }
}
and the cart model json value is 
[
  {
      "_id": "67125296ba37a1c0cb036b14",
      "productId": "670fbad457974eaa8bd8d3b9",
      "productName": "Pencil",
      "productPrice": 118,
      "category": "pen",
      "gst": 18,
      "quantity": 2,
      "sku": "SKU1",
      "reorderPoint": "10",
      "warehouse": "covai",
      "__v": 0
  },
  {
      "_id": "67125aa8cb9a78884f039545",
      "productId": "670fb8df57974eaa8bd8d3a2",
      "productName": "Sample Product update",
      "productPrice": 118,
      "category": "electronics",
      "gst": 18,
      "quantity": 1,
      "sku": "SKU12345wewq",
      "reorderPoint": "10",
      "warehouse": "covai",
      "__v": 0
  },
  {
      "_id": "67125aaccb9a78884f03954e",
      "productId": "67123f074c45c334acc0cd27",
      "productName": "note book",
      "productPrice": 2360,
      "category": "t-shirt",
      "gst": 18,
      "quantity": 1,
      "sku": "sdafsdkkalwed",
      "reorderPoint": "5",
      "warehouse": "covai",
      "__v": 0
  },
  {
      "_id": "67125ab1cb9a78884f039553",
      "productId": "670fb8df57974eaa8bd8d3a2",
      "productName": "Sample Product update",
      "productPrice": 118,
      "category": "electronics",
      "gst": 18,
      "quantity": 1,
      "sku": "SKU12345wewq",
      "reorderPoint": "5",
      "warehouse": "ooty",
      "__v": 0
  },
  {
      "_id": "67125ab3cb9a78884f039558",
      "productId": "670fba7757974eaa8bd8d3b0",
      "productName": "Sample Product1",
      "productPrice": 16885.8,
      "category": "electronicsww223",
      "gst": 18,
      "quantity": 1,
      "sku": "SKU12345q",
      "reorderPoint": "5",
      "warehouse": "ooty",
      "__v": 0
  }
]
the order model is 

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        reorderPoint: { type: Number, required: true },
    }],
    totalValue: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerPhoneNumber: { type: String, required: true },
    paymentType: { type: String, required: true },
    upiId: { type: String, default: null }, 
    cardNo: { type: String, default: null }, 
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;


app.post('/order', async (req, res) => {
rewrite the code correctly and correctly find the product 
witch warehouse product the quantity - warehouse.product.stock correctly
update and write model api test post man model json value