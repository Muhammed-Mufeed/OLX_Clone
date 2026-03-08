import React, { useEffect, useState } from 'react'
import './SingleProduct.css'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../../Firebase/firebase';

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Fetch product details by ID
  const fetchProductDetails = async () => {
    const productDoc = doc(db, "products", id);
    const docSnap = await getDoc(productDoc);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
    } else {
      console.log("No such product!");
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imageUrl} alt={product.productName} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.productName}</span>
          <p>{product.category}</p>
          <p>{product.description || "No description available"}</p> {/* Display description */}
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
        <button
          className="editBtn"
          onClick={() => navigate(`/editproduct/${id}`)}
        >
          Edit Product
        </button>
      </div>
    </div>
  )
}

export default SingleProductPage