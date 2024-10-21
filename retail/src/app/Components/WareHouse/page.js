// 'use client'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import "./WareHouseManagement.css";

// export default function WareHouseManagement() {
//     // Initialize formData with default values
//     const [formData, setFormData] = useState({
//         orderNo: '',
//         date: '',
//         reason: '',
//         sourceWarehouse: '',
//         destinationWarehouse: '',
//         itemDetail: '',
//         currentAvailability: '',
//         destinationAvailability: '',
//         transferQuantity: ''
//     });

//     // State to store fetched product details
//     const [sourceProduct, setSourceProduct] = useState(null);
//     const [destinationProduct, setDestinationProduct] = useState(null);

//     // Handle input changes for all fields
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // Fetch product details when sourceWarehouse or destinationWarehouse changes
//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 // Fetch source product data
//                 if (formData.sourceWarehouse && formData.itemDetail) {
//                     const response = await axios.get(`http://localhost:4000/getOnchangeValue`, {
//                         params: {
//                             name: formData.itemDetail, 
//                             sourceWarehouse: formData.sourceWarehouse, 
//                             destinationWarehouse: formData.destinationWarehouse
//                         }
//                     });
//                     setSourceProduct(response.data.sourceProduct);
//                     setDestinationProduct(response.data.destinationProduct);
//                 }
//             } catch (error) {
//                 console.error('Error fetching product data:', error);
//             }
//         };

//         fetchProductData();
//     }, [formData.sourceWarehouse, formData.destinationWarehouse, formData.itemDetail]);

//     // Handle form submission
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form Data:', formData);
//         axios.post('http://localhost:4000/goods/transfer', formData)
//             .then(response => alert("Success"))
//             .catch(error => console.log(error));
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div className="box">
//                     <label>Order No:</label>
//                     <input 
//                         type="text" 
//                         name="orderNo"
//                         placeholder='Enter the Order No:' 
//                         value={formData.orderNo}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="date">
//                     <label>Date:</label>
//                     <input 
//                         type="date" 
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="box">
//                     <label>Reason:</label>
//                     <textarea 
//                         name="reason"
//                         placeholder='Enter Transfer Reason'
//                         rows={4}
//                         value={formData.reason}
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>
//                 <div className="dropdown-container">
//                     <div className="drop-down">
//                         <h3>Source Warehouse</h3>
//                         <select 
//                             name="sourceWarehouse"
//                             value={formData.sourceWarehouse}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select Source Warehouse</option>
//                             <option value="covai">Covai</option>
//                             <option value="ooty">Ooty</option>
//                             <option value="kerala">Kerala</option>
//                             <option value="chennai">Chennai</option>
//                             <option value="bangalore">Bangalore</option>
//                         </select>
//                     </div>
//                     <div className="addproduct-itemfield">
//                         <h3>Destination Warehouse</h3>
//                         <select 
//                             name="destinationWarehouse"
//                             value={formData.destinationWarehouse}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select Destination Warehouse</option>
//                             <option value="covai">Covai</option>
//                             <option value="ooty">Ooty</option>
//                             <option value="kerala">Kerala</option>
//                             <option value="chennai">Chennai</option>
//                             <option value="bangalore">Bangalore</option>
//                         </select>
//                     </div>
//                 </div>
//                 <table border={2}>
//                     <thead>
//                         <tr>
//                             <th>Item Detail</th>
//                             <th>Current Availability</th>
//                             <th>Transfer Quantity</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <textarea 
//                                     name="itemDetail"
//                                     rows={5}
//                                     value={formData.itemDetail}
//                                     onChange={handleChange}
//                                 ></textarea>
//                             </td>
//                             <td>
//                                 <input 
//                                     type="text" 
//                                     name="currentAvailability"
//                                     placeholder='Source Stack'
//                                     value={sourceProduct ? sourceProduct.stock : formData.currentAvailability}
//                                     onChange={handleChange}
//                                     disabled
//                                 />
//                             </td>
//                             <td>
//                                 <input 
//                                     type="text" 
//                                     name="destinationAvailability"
//                                     placeholder='Destination Stack'
//                                     value={destinationProduct ? destinationProduct.stock : formData.destinationAvailability}
//                                     onChange={handleChange}
//                                     disabled
//                                 />
//                             </td>
//                             <td>
//                                 <textarea 
//                                     name="transferQuantity"
//                                     rows={5}
//                                     value={formData.transferQuantity}
//                                     onChange={handleChange}
//                                 ></textarea>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }






'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WareHouseManagement() {
    const [formData, setFormData] = useState({
        orderNo: '',
        date: '',
        reason: '',
        sourceWarehouse: '',
        destinationWarehouse: '',
        itemDetail: '',
        currentAvailability: '',
        destinationAvailability: '',
        transferQuantity: ''
    });

    const [sourceProduct, setSourceProduct] = useState(null);
    const [destinationProduct, setDestinationProduct] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (formData.sourceWarehouse && formData.itemDetail) {
                    const response = await axios.get(`http://localhost:4000/getOnchangeValue`, {
                        params: {
                            name: formData.itemDetail, 
                            sourceWarehouse: formData.sourceWarehouse, 
                            destinationWarehouse: formData.destinationWarehouse
                        }
                    });
                    setSourceProduct(response.data.sourceProduct);
                    setDestinationProduct(response.data.destinationProduct);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [formData.sourceWarehouse, formData.destinationWarehouse, formData.itemDetail]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        axios.post('http://localhost:4000/goods/transfer', formData)
            .then(response => alert("Success"))
            .catch(error => console.log(error));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Warehouse Management</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Order No:</label>
                    <input 
                        type="text" 
                        name="orderNo"
                        placeholder='Enter the Order No' 
                        value={formData.orderNo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Date:</label>
                    <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Reason:</label>
                    <textarea 
                        name="reason"
                        placeholder='Enter Transfer Reason'
                        rows={4}
                        value={formData.reason}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    ></textarea>
                </div>

                <div className="mb-4 flex justify-between">
                    <div className="w-1/2 pr-2">
                        <label className="block font-medium mb-1">Source Warehouse</label>
                        <select 
                            name="sourceWarehouse"
                            value={formData.sourceWarehouse}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        >
                            <option value="">Select Source Warehouse</option>
                            <option value="covai">Covai</option>
                            <option value="ooty">Ooty</option>
                            <option value="kerala">Kerala</option>
                            <option value="chennai">Chennai</option>
                            <option value="bangalore">Bangalore</option>
                        </select>
                    </div>

                    <div className="w-1/2 pl-2">
                        <label className="block font-medium mb-1">Destination Warehouse</label>
                        <select 
                            name="destinationWarehouse"
                            value={formData.destinationWarehouse}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        >
                            <option value="">Select Destination Warehouse</option>
                            <option value="covai">Covai</option>
                            <option value="ooty">Ooty</option>
                            <option value="kerala">Kerala</option>
                            <option value="chennai">Chennai</option>
                            <option value="bangalore">Bangalore</option>
                        </select>
                    </div>
                </div>

                <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Item Detail</th>
                            <th className="border border-gray-300 p-2">Current Availability</th>
                            <th className="border border-gray-300 p-2">Transfer Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">
                                <textarea 
                                    name="itemDetail"
                                    rows={5}
                                    value={formData.itemDetail}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                ></textarea>
                            </td>
                            <td className="border border-gray-300 p-2">
                                <input 
                                    type="text" 
                                    name="currentAvailability"
                                    placeholder='Source Stack'
                                    value={sourceProduct ? sourceProduct.stock : formData.currentAvailability}
                                    onChange={handleChange}
                                    disabled
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </td>
                            <td className="border border-gray-300 p-2">
                                <input 
                                    type="text" 
                                    name="destinationAvailability"
                                    placeholder='Destination Stack'
                                    value={destinationProduct ? destinationProduct.stock : formData.destinationAvailability}
                                    onChange={handleChange}
                                    disabled
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </td>
                            <td className="border border-gray-300 p-2">
                                <textarea 
                                    name="transferQuantity"
                                    rows={5}
                                    value={formData.transferQuantity}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
                    Submit
                </button>
            </form>
        </div>
    );
}
