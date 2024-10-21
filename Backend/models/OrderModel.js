// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     items: [{
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//         productName: { type: String, required: true },
//         productPrice: { type: Number, required: true },
//         quantity: { type: Number, required: true },
//         reorderPoint:{type:Number,required:true},
//     }],
//     totalValue: { type: Number, required: true },
//     totalQuantity: { type: Number, required: true },
//     customerName: { type: String, required: true },
//     customerPhoneNumber: { type: String, required: true },
//     paymentType: { type: String, required: true },
//     upiId: { type: String }, 
//     cardNo: { type: String }, 
//     createdAt: { type: Date, default: Date.now }
// });

// const Order = mongoose.model('Order', OrderSchema);

// module.exports = Order;



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
