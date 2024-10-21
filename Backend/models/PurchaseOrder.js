// const mongoose=require('mongoose');


// const PurchaseSchema=new mongoose.Schema({
//     productId:{type:String,required:true},
//     productname:{type:String,required:true},
//     vendorId:{type:String,required:true},
//     VendorName:{type:String,required:true},
//     message:{type:String,required:true}
// })

// const Purchase=mongoose.Schema('purchase',PurchaseSchema);

// module.exports=Purchase;




const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productname: { type: String, required: true },
    vendorId: { type: String, required: true },
    VendorName: { type: String, required: true },
    message: { type: String, required: true },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
