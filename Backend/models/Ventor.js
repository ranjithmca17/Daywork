// const mongoose=require('mongoose');

// //Ventor schema

// const VentorSchema=new mongoose.Schema({
//     id:{type:String,required:true,unique:true},
//     name:{type:String,required:true},
//     address:{type:String,required:true},
//     phone:{type:String,required:true},
//     email:{type:String,required:true,unique:true}
// });

// const Ventors=mongoose.model('ventor',VentorSchema);

// module.exports=Ventors;





const mongoose = require('mongoose');

// Product sub-schema
const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Ventor schema
const VentorSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    products: [ProductSchema] // Products array using the ProductSchema
});

const Ventors = mongoose.model('ventor', VentorSchema);

module.exports = Ventors;
