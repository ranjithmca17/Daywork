'use client'
import React, { useState } from 'react';
import axios from 'axios';
import UploadArea from '@/app/Assets/upload_area.svg'
import Image from 'next/image';

export default function App() {
  
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    ventorId:'',
    godown:'covai',
    sku: '',
    gst: '', 
    reorderPoint:'',
    description: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    try {
      console.log('Product Details Before Upload:', productDetails);
      console.log('Selected Image:', image);

      // Upload image
      const formData = new FormData();
      formData.append('product', image);

      const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image Upload Response:', imageResponse.data);

      if (imageResponse.data.success) {
        const product = {
          ...productDetails,
          image: imageResponse.data.image_url,
        };

        console.log('Complete Product Object:', product);

        // Add product
        const productResponse = await axios.post('http://localhost:4000/api/addproduct', product, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Add Product Response:', productResponse.data);

        if (productResponse.data.success) {
          const addedProduct = productResponse.data.product;
          alert(`Product added successfully.`);
          console.log('Added Product Details:', addedProduct);

          // Reset form state
          setProductDetails({
            name: '',
            category: '',
            price: '',
            stock: '',
            ventorId:'',
            godown:'covai',
            sku: '',
            reorderPoint:'',
            gst: '', // Reset GST field
            description: '',
          });

          setImage(null); // Clear image preview
        } else {
          alert(`Failed to add product. Server returned: ${productResponse.data.message || 'Unknown error'}`);
        }
      } else {
        alert(`Failed to upload image. Server returned: ${imageResponse.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during product addition:', error.response ? error.response.data : error.message);
      alert(error.response.data.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product : {process.env.VAL} Val is </h2>
        <form onSubmit={addProduct} className="space-y-4">
          {Object.entries(productDetails).map(([key, value]) => (
            key !== 'godown' && key !== 'image' && (
              <div key={key} className="flex flex-col">
                <label className="font-medium mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                {key === 'description' ? (
                  <textarea
                    name={key}
                    value={value}
                    onChange={changeHandler}
                    placeholder="Enter Description"
                    required
                    className="border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <input
                    value={value}
                    onChange={changeHandler}
                    type={key === 'price' || key === 'stock' || key === 'gst' || key === 'reorderPoint' || key === 'ventorId' ? 'number' : 'text'}
                    name={key}
                    placeholder="Type here"
                    required
                    className="border border-gray-300 rounded-md p-2"
                  />
                )}
              </div>
            )
          ))}
          
          <div className="flex flex-col">
            <label className="font-medium mb-1">Select Product Added Godown</label>
            <select name="godown" value={productDetails.godown} onChange={changeHandler} className="border border-gray-300 rounded-md p-2">
              <option value="covai">Covai</option>
              <option value="ooty">Ooty</option>
              <option value="kerala">Kerala</option>
              <option value="chennai">Chennai</option>
              <option value="bangalore">Bangalore</option>
            </select>
          </div>

          <div className="flex flex-col">
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


          {/* <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <Image
              src={image ? URL.createObjectURL(image) : UploadArea}
              alt="Upload Area"
              className="addproduct-thumbnail-image"
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
        </div> */}


          <button className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}