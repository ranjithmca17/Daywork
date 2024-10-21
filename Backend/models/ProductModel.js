
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    news:{type:String,default:"news val"},
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    gst: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Object, required: true }, // { covai: Number, ooty: Number, ... }
    ventorId: { type: Number, required: true },
    reorderPoints: { type: Object, required: true }, // { covai: Number, ooty: Number, ... }
    finalPrice: { type: Number, required: true },
    totalStockValue: { type: Number, default: 10 }, // New field for total stock value
}, { timestamps: true });

productSchema.methods.calculateTotalStockValue = function () {
    const totalValue = Object.entries(this.stock).reduce((total, [godown, quantity]) => {
        return total + Number(quantity);
    }, 0);
    this.totalStockValue = totalValue;
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;


