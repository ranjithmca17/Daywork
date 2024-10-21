const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Admin Schema
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Hash password before saving admin
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare hashed password with input password
adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
