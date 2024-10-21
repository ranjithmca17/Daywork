

// // UserModel.ts
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, 'Please provide a username'],
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: [true, 'Please provide an email'],
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: [true, 'Please provide a password'],
//     },
//     tenantId: {
//         type: String,
//         required: true,
//     },
//     isVerified: {
//         type: Boolean,
//         default: false,
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date,
// });

// const UserVal = mongoose.models.User || mongoose.model('User', UserSchema);

// export default UserVal;





import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', 
        required: [true, 'Role is required'],
    },
    tenantId: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

let User;
if (mongoose.modelNames().includes('users')) {
    User = mongoose.model('users');
} else {
    User = mongoose.model('users', userSchema);
}

export default User;
