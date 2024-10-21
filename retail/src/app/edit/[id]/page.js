
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UploadArea from '@/app/Assets/upload_area.svg';
// import Image from 'next/image';

// export default function EditProduct({ params }) {
//   const [image, setImage] = useState(null);
//   const [productDetails, setProductDetails] = useState({
//     name: '',
//     category: '',
//     price: '',
//     stock: {},
//     reorderPoints: {},
//     ventorId: '',
//     godown: 'covai',
//     sku: '',
//     gst: '',
//     description: '',
//     image: ''
//   });

//   // Fetch the product details
//   const fetchSingleProduct = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/getsingleproduct/${params.id}`);
//       const product = response.data.findProduct;

//       setProductDetails({
//         name: product.name,
//         category: product.category,
//         price: product.price,
//         stock: product.stock,
//         reorderPoints: product.reorderPoints,
//         ventorId: product.ventorId,
//         godown: product.godown,
//         sku: product.sku,
//         gst: product.gst,
//         description: product.description,
//         image: product.image,
//       });
//       setImage(null); // Reset image state to avoid confusion
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSingleProduct();
//   }, []);

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       if (image) {
//         formData.append('product', image);
//       }

//       const product = {
//         ...productDetails,
//         image: image ? null : productDetails.image,
//       };

//       // Upload image if a new image is selected
//       let imageResponse;
//       if (image) {
//         imageResponse = await axios.post('http://localhost:4000/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (imageResponse.data.success) {
//           product.image = imageResponse.data.image_url;
//         } else {
//           alert(`Failed to upload image: ${imageResponse.data.message || 'Unknown error'}`);
//           return;
//         }
//       } else {
//         product.image = productDetails.image; // Keep existing image if no new upload
//       }

//       const productResponse = await axios.put(`http://localhost:4000/allproduct/${params.id}`, product, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (productResponse.data.success) {
//         alert(`Product updated successfully.`);
//         fetchSingleProduct(); // Refresh the product details
//         setImage(null); // Clear image preview
//       } else {
//         alert(`Failed to update product: ${productResponse.data.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error occurred during product update:', error.response ? error.response.data : error.message);
//       alert(error.response.data.message);
//     }
//   };

//   const handleStockChange = (e) => {
//     const { value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       stock: {
//         ...prevDetails.stock,
//         [prevDetails.godown]: value,
//       },
//     }));
//   };

//   const handleReorderPointChange = (e) => {
//     const { value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       reorderPoints: {
//         ...prevDetails.reorderPoints,
//         [prevDetails.godown]: value,
//       },
//     }));
//   };

//   return (
//     <div className="edit-product">
//       <form onSubmit={updateProduct}>
//         <div className="edit-product-itemfield">
//           <p>Product Title</p>
//           <input
//             value={productDetails.name}
//             onChange={changeHandler}
//             type="text"
//             name="name"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Product Category</p>
//           <input
//             value={productDetails.category}
//             onChange={changeHandler}
//             type="text"
//             name="category"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Product Price</p>
//           <input
//             value={productDetails.price}
//             onChange={changeHandler}
//             type="number"
//             name="price"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Product SKU</p>
//           <input
//             value={productDetails.sku}
//             onChange={changeHandler}
//             type="text"
//             name="sku"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Product Description</p>
//           <textarea
//             name="description"
//             value={productDetails.description}
//             onChange={changeHandler}
//             placeholder="Enter Description"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Stock in {productDetails.godown}</p>
//           <input
//             value={productDetails.stock[productDetails.godown] || ''}
//             onChange={handleStockChange}
//             type="number"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Reorder Point for {productDetails.godown}</p>
//           <input
//             value={productDetails.reorderPoints[productDetails.godown] || ''}
//             onChange={handleReorderPointChange}
//             type="number"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Ventor Id:</p>
//           <input
//             value={productDetails.ventorId}
//             onChange={changeHandler}
//             type="number"
//             name="ventorId"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Select Product Added Godown</p>
//           <select name="godown" value={productDetails.godown} onChange={(e) => {
//             changeHandler(e);
//             setProductDetails((prevDetails) => ({
//               ...prevDetails,
//               stock: { ...prevDetails.stock, [e.target.value]: prevDetails.stock[prevDetails.godown] },
//               reorderPoints: { ...prevDetails.reorderPoints, [e.target.value]: prevDetails.reorderPoints[prevDetails.godown] },
//             }));
//           }}>
//             <option value="covai">Covai</option>
//             <option value="ooty">Ooty</option>
//             <option value="kerala">Kerala</option>
//             <option value="chennai">Chennai</option>
//             <option value="bangalore">Bangalore</option>
//           </select>
//         </div>

//         <div className="edit-product-itemfield">
//           <p>Product GST (%)</p>
//           <input
//             value={productDetails.gst}
//             onChange={changeHandler}
//             type="number"
//             name="gst"
//             placeholder="Enter GST"
//             required
//           />
//         </div>

//         <div className="edit-product-itemfield">
//           <label htmlFor="file-input">
//             <Image
//               src={image ? URL.createObjectURL(image) : productDetails.image || UploadArea}
//               alt="Upload Area"
//               className="edit-product-thumbnail-image"
//               height={150}
//               width={150}
//             />
//           </label>
//           <input
//             type="file"
//             onChange={imageHandler}
//             name="image"
//             id="file-input"
//             hidden
//           />
//         </div>

//         <button className="edit-product-btn" type="submit">
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }





'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadArea from '@/app/Assets/upload_area.svg';
import Image from 'next/image';

export default function EditProduct({ params }) {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: '',
    stock: {},
    reorderPoints: {},
    ventorId: '',
    godown: 'covai',
    sku: '',
    gst: '',
    description: '',
    image: ''
  });

  // Fetch product details on mount
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getsingleproduct/${params.id}`);
        const product = response.data.findProduct;

        setProductDetails({
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock || {},
          reorderPoints: product.reorderPoints || {},
          ventorId: product.ventorId,
          godown: product.godown,
          sku: product.sku,
          gst: product.gst,
          description: product.description,
          image: product.image,
        });
        setImage(null); // Reset image state to avoid confusion
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchSingleProduct();
  }, [params.id]);

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image upload
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Update product details
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append('product', image);
      }

      const updatedProduct = {
        ...productDetails,
        image: image ? null : productDetails.image,
      };

      // Upload image if a new one is selected
      if (image) {
        const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (imageResponse.data.success) {
          updatedProduct.image = imageResponse.data.image_url;
        } else {
          alert(`Failed to upload image: ${imageResponse.data.message || 'Unknown error'}`);
          return;
        }
      }

      const productResponse = await axios.put(`http://localhost:4000/allproduct/${params.id}`, updatedProduct, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (productResponse.data.success) {
        alert('Product updated successfully.');
        setImage(null); // Clear image preview
      } else {
        alert(`Failed to update product: ${productResponse.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during product update:', error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  // Handle stock and reorder point changes
  const handleStockChange = (e) => {
    const { value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      stock: {
        ...prevDetails.stock,
        [prevDetails.godown]: value,
      },
    }));
  };

  const handleReorderPointChange = (e) => {
    const { value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      reorderPoints: {
        ...prevDetails.reorderPoints,
        [prevDetails.godown]: value,
      },
    }));
  };

  return (
    <div className="edit-product">
      <form onSubmit={updateProduct}>
        <div className="edit-product-itemfield">
          <label>Product Title</label>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Product Category</label>
          <input
            value={productDetails.category}
            onChange={changeHandler}
            type="text"
            name="category"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Product Price</label>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="number"
            name="price"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Product SKU</label>
          <input
            value={productDetails.sku}
            onChange={changeHandler}
            type="text"
            name="sku"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Product Description</label>
          <textarea
            name="description"
            value={productDetails.description}
            onChange={changeHandler}
            placeholder="Enter Description"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Stock in {productDetails.godown}</label>
          <input
            value={productDetails.stock[productDetails.godown] || ''}
            onChange={handleStockChange}
            type="number"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Reorder Point for {productDetails.godown}</label>
          <input
            value={productDetails.reorderPoints[productDetails.godown] || ''}
            onChange={handleReorderPointChange}
            type="number"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Ventor ID</label>
          <input
            value={productDetails.ventorId}
            onChange={changeHandler}
            type="number"
            name="ventorId"
            placeholder="Type here"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Select Product Added Godown</label>
          <select
            name="godown"
            value={productDetails.godown}
            onChange={(e) => {
              const newGodown = e.target.value;
              changeHandler(e);
              // Preserve stock and reorder point when changing godown
              setProductDetails((prevDetails) => ({
                ...prevDetails,
                stock: { ...prevDetails.stock, [newGodown]: prevDetails.stock[prevDetails.godown] || '' },
                reorderPoints: { ...prevDetails.reorderPoints, [newGodown]: prevDetails.reorderPoints[prevDetails.godown] || '' },
              }));
            }}
          >
            <option value="covai">Covai</option>
            <option value="ooty">Ooty</option>
            <option value="kerala">Kerala</option>
            <option value="chennai">Chennai</option>
            <option value="bangalore">Bangalore</option>
          </select>
        </div>

        <div className="edit-product-itemfield">
          <label>Product GST (%)</label>
          <input
            value={productDetails.gst}
            onChange={changeHandler}
            type="number"
            name="gst"
            placeholder="Enter GST"
            required
          />
        </div>

        <div className="edit-product-itemfield">
          <label>Upload Image</label>
          <label htmlFor="file-input">
            <Image
              src={image ? URL.createObjectURL(image) : productDetails.image || UploadArea}
              alt="Upload Area"
              className="edit-product-thumbnail-image"
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
          />
        </div>

        <button className="edit-product-btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}
