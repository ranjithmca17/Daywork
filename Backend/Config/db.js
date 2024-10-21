// // const mongoose = require("mongoose");

// // const connectDB = async (tenantId) => {
// //     try {
// //         await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`);
// //         console.log(`Connected to MongoDB tenent Id is ${tenantId}`);
// //     } catch (error) {
// //         console.error("Connection to MongoDB failed:", error.message);
// //     }
// // };

// // module.exports = connectDB;


// const mongoose = require("mongoose");

// // Function to connect to MongoDB using tenant ID
// const connectDB = async (tenantId) => {
//     try {
//         await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`Connected to MongoDB. Tenant ID is ${tenantId}`);
//     } catch (error) {
//         console.error("Connection to MongoDB failed:", error.message);
//         throw error; // Propagate the error for further handling
//     }
// };

// module.exports = connectDB;





// const mongoose = require("mongoose");

// // Function to connect to MongoDB using tenant ID
// const connectDB = async (tenantId) => {
//     try {
//         await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`);
//         console.log(`Connected to MongoDB. Tenant ID is ${tenantId}`);
//     } catch (error) {
//         console.error("Connection to MongoDB failed:", error.message);
//         throw error; // Propagate the error for handling in the endpoint
//     }
// };

// module.exports = connectDB;







const mongoose = require("mongoose");

// Function to connect to MongoDB using tenant ID
const connectDB = async () => {
    try {
        // await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/retail`);
        await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/retail_Extract`);
        console.log(`Connected to MongoDB. Tenant ID is /retail`);
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
        throw error; // Propagate the error for handling in the endpoint
    }
};

module.exports = connectDB;

