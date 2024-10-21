

'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function AddVentor() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/addventor', formData);
            if (response.data.success) {
                alert("Vendor Account Created Successfully");
                setFormData({
                    id: '',
                    name: '',
                    address: '',
                    phone: '',
                    email: ''
                });
            }
        } catch (error) {
            console.log("Cannot add vendor: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Vendor</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Vendor Id:</label>
                    <input
                        type="text"
                        placeholder='Enter a Vendor Id'
                        name='id'
                        onChange={handleChange}
                        value={formData.id}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Vendor Name:</label>
                    <input
                        type="text"
                        placeholder='Enter a Vendor Name'
                        name='name'
                        onChange={handleChange}
                        value={formData.name}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Address:</label>
                    <textarea
                        placeholder='Enter Vendor Address'
                        name='address'
                        onChange={handleChange}
                        value={formData.address}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                        rows={4}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Phone:</label>
                    <input
                        type="text"
                        placeholder='Enter Phone Number'
                        name='phone'
                        onChange={handleChange}
                        value={formData.phone}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        placeholder='Enter Vendor Email'
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <button type='submit' className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
                    Submit
                </button>
            </form>
        </div>
    );
}






// 'use client'; // Indicating this is a client component
// import { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Link from 'next/link';

// export default function AddVendor() {
//     const [vendor, setVendor] = useState({
//         id: '',
//         name: '',
//         address: '',
//         phone: '',
//         email: '',
//         products: [{ productId: '', productName: '', price: '', quantity: '' }] // Initialize with one product
//     });

//     const [loading, setLoading] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setVendor((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleProductChange = (index, e) => {
//         const { name, value } = e.target;
//         const products = [...vendor.products];
//         products[index][name] = value;
//         setVendor((prev) => ({
//             ...prev,
//             products,
//         }));
//     };

//     const addProduct = () => {
//         setVendor((prev) => ({
//             ...prev,
//             products: [...prev.products, { productId: '', productName: '', price: '', quantity: '' }],
//         }));
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post('http://localhost:4000/addventor', vendor);
//             if (response.data.success) {
//                 toast.success('Vendor added successfully!');
//                 setVendor({ id: '', name: '', address: '', phone: '', email: '', products: [{ productId: '', productName: '', price: '', quantity: '' }] }); // Reset form
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error('Error adding vendor: ' + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold mb-4">Add Vendor</h1>
//             <form onSubmit={onSubmit} className="w-full max-w-md">
//                 <input type="text" name="id" placeholder="Vendor ID" value={vendor.id} onChange={handleInputChange} required className="mb-2 p-2 border border-gray-300 rounded" />
//                 <input type="text" name="name" placeholder="Name" value={vendor.name} onChange={handleInputChange} required className="mb-2 p-2 border border-gray-300 rounded" />
//                 <input type="text" name="address" placeholder="Address" value={vendor.address} onChange={handleInputChange} required className="mb-2 p-2 border border-gray-300 rounded" />
//                 <input type="text" name="phone" placeholder="Phone" value={vendor.phone} onChange={handleInputChange} required className="mb-2 p-2 border border-gray-300 rounded" />
//                 <input type="email" name="email" placeholder="Email" value={vendor.email} onChange={handleInputChange} required className="mb-2 p-2 border border-gray-300 rounded" />

//                 <h2 className="text-lg font-semibold mb-2">Products</h2>
//                 {vendor.products.map((product, index) => (
//                     <div key={index} className="mb-2 flex space-x-2">
//                         <input type="text" name="productId" placeholder="Product ID" value={product.productId} onChange={(e) => handleProductChange(index, e)} required className="p-2 border border-gray-300 rounded" />
//                         <input type="text" name="productName" placeholder="Product Name" value={product.productName} onChange={(e) => handleProductChange(index, e)} required className="p-2 border border-gray-300 rounded" />
//                         <input type="number" name="price" placeholder="Price" value={product.price} onChange={(e) => handleProductChange(index, e)} required className="p-2 border border-gray-300 rounded" />
//                         <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={(e) => handleProductChange(index, e)} required className="p-2 border border-gray-300 rounded" />
//                     </div>
//                 ))}
//                 <button type="button" onClick={addProduct} className="mb-4 p-2 text-blue-600">Add Another Product</button>

//                 <button type="submit" disabled={loading} className={`p-2 text-white ${loading ? 'bg-gray-500' : 'bg-blue-600'}`}>
//                     {loading ? 'Adding...' : 'Add Vendor'}
//                 </button>
//             </form>
//             <p className="mt-4">Want to go back? <Link href="/vendors">View Vendors</Link></p>
//         </div>
//     );
// }

