'use client';
import React, { useState } from 'react';
import axios from 'axios';
import UploadArea from '@/app/Assets/upload_area.svg';
import Image from 'next/image';

export default function App() {
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: '',
    sku: '',
    ventorId: '',
    gst: '',
    description: '',
  });

  const [stocks, setStocks] = useState({});
  const [reorderPoints, setReorderPoints] = useState({});
  const [showInputs, setShowInputs] = useState({});

  const godowns = ['covai', 'ooty', 'kerala', 'chennai', 'bangalore'];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const stockChangeHandler = (godown, value) => {
    setStocks((prevStocks) => ({
      ...prevStocks,
      [godown]: value,
    }));
  };

  const reorderPointChangeHandler = (godown, value) => {
    setReorderPoints((prevPoints) => ({
      ...prevPoints,
      [godown]: value,
    }));
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const toggleShowInputs = (godown) => {
    setShowInputs((prev) => ({
      ...prev,
      [godown]: !prev[godown],
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    const product = {
      ...productDetails,
      image: URL.createObjectURL(image),
      stocks,
      reorderPoints,
    };

    try {
      const formData = new FormData();
      formData.append('product', image);

      const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (imageResponse.data.success) {
        const productResponse = await axios.post('http://localhost:4000/api/addproduct', product, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (productResponse.data.success) {
          alert('Product added successfully.');
          resetForm();
        } else {
          alert(`Failed to add product. Server returned: ${productResponse.data.message || 'Unknown error'}`);
        }
      } else {
        alert(`Failed to upload image. Server returned: ${imageResponse.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during product addition:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const resetForm = () => {
    setProductDetails({
      name: '',
      category: '',
      price: '',
      sku: '',
      ventorId: '',
      gst: '',
      description: '',
    });
    setStocks({});
    setReorderPoints({});
    setImage(null);
    setShowInputs({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
        <form onSubmit={addProduct} className="space-y-4">
          {Object.entries(productDetails).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="font-medium mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                value={value}
                onChange={changeHandler}
                type={key === 'price' || key === 'gst' ? 'number' : 'text'}
                name={key}
                placeholder="Type here"
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}

          {/* Godown Checkboxes and Inputs */}
          {godowns.map((godown) => (
            <div key={godown} className="flex flex-col mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showInputs[godown] || false}
                  onChange={() => toggleShowInputs(godown)}
                  className="mr-2"
                />
                {godown.charAt(0).toUpperCase() + godown.slice(1)}
              </label>

              {showInputs[godown] && (
                <div className="flex flex-col">
                  <div className="flex flex-col mb-2">
                    <label className="font-medium mb-1">Stock in {godown.charAt(0).toUpperCase() + godown.slice(1)}</label>
                    <input
                      type="number"
                      value={stocks[godown] || ''}
                      onChange={(e) => stockChangeHandler(godown, e.target.value)}
                      placeholder="Enter stock"
                      className="border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col mb-2">
                    <label className="font-medium mb-1">Reorder Point in {godown.charAt(0).toUpperCase() + godown.slice(1)}</label>
                    <input
                      type="number"
                      value={reorderPoints[godown] || ''}
                      onChange={(e) => reorderPointChangeHandler(godown, e.target.value)}
                      placeholder="Enter reorder point"
                      className="border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-col">
            <label htmlFor="file-input">Upload Image</label>
            <div className="flex justify-center">
              <label htmlFor="file-input">
                <Image
                  src={image ? URL.createObjectURL(image) : UploadArea}
                  alt="Upload Area"
                  className="w-32 h-32 object-cover border border-gray-300 rounded-md cursor-pointer"
                  height={150}
                  width={150}
                />
              </label>
              <input
                type="file"
                onChange={imageHandler}
                name="image"
                id="file-input"
                hidden
                required
              />
            </div>
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
