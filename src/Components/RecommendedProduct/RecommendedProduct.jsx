import React, { useEffect, useState } from "react";
import "./RecommendedProduct.css";
import Heart from "../../assets/Heart";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products: " + error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <>
              {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="card">
                    <div className="favorite">
                      <Heart />
                    </div>
                    <div className="image">
                      <img src={product.imageUrl} alt={product.productName} />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name">{product.productName}</p>
                      <p className="description">
                        {product.description?.substring(0, 50) || "No description"}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;