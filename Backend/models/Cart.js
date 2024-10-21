// const mongoose=require('mongoose');

// const CartModel=new mongoose.Schema({
//     productId:{
//         type: mongoose.Schema.Types.ObjectId, required:true
//     },
//     productName:{
//         type:String,
//         required:true
//     },
//     productPrice:{
//         type:Number,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     gst:{
//         type:Number,
//         required:true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 1 // Default quantity to 1 if not specified
//     },
//     sku:{
//         type:String,
//         required:true
//     },
//     reorderPoint:{
//         type:String,required:true
//     }
// })

// const Cart=mongoose.model('billcart',CartModel);

// module.exports=Cart;




const mongoose = require('mongoose');

const CartModel = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity to 1 if not specified
    },
    sku: {
        type: String,
        required: true
    },
    reorderPoint: {
        type: String,
        required: true
    },
    warehouse: {
        type: String, // New field for the selected warehouse
        required: true
    }
});

const Cart = mongoose.model('billcart', CartModel);

module.exports = Cart;
