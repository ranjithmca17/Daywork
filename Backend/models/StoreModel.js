

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Store Schema
const StoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tenantId:{type:String,required:true,unique:true},
    date: { type: Date, default: Date.now }
});

// Hash password before saving admin
StoreSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare hashed password with input password
StoreSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Store = mongoose.model('store', StoreSchema);

module.exports = Store;
