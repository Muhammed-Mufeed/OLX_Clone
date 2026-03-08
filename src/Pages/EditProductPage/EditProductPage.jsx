import React, { useState, useEffect } from "react";
import "../AddProductPage/AddProductPage.css";
import { updateProduct, db, auth } from "../../Firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../../Cloudnary/ImageService";
import { doc, getDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import OlxLogo from "../../assets/OlxLogo";

const EditProductPage = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "products", id);
        const docSnap = await getDoc(productDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProductName(data.productName);
          setCategory(data.category);
          setPrice(data.price.toString());
          setDescription(data.description || "");
          setImagePreview(data.imageUrl);
        } else {
          toast.error("Product not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product: " + error.message);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    if (!auth.currentUser) {
      toast.error("Please log in to edit a product");
      navigate("/login");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      let imageUrl = imagePreview;
      if (image) {
        imageUrl = await uploadImage(image);
      }
      const updatedProduct = {
        productName,
        category,
        price: parseFloat(price),
        description,
        imageUrl,
        uid: auth.currentUser.uid,
        updatedAt: new Date().toISOString(),
      };
      await updateProduct(id, updatedProduct);
      toast.success("Product updated successfully");
      navigate(`/product/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.code === "permission-denied") {
        toast.error("You can only edit your own products");
      } else {
        toast.error(`Failed to update product: ${error.message}`);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="signupContainer">
        <div className="signupForm">
          <div className="logoContainer">
            <OlxLogo />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="productName">Product Name</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                id="productName"
                placeholder="Enter product name"
                disabled={isLoading}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="category">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                id="category"
                placeholder="Enter category"
                disabled={isLoading}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="price">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                id="price"
                placeholder="Enter price"
                disabled={isLoading}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="description">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                placeholder="Enter product description"
                rows="4"
                disabled={isLoading}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="image">Choose Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImage}
                disabled={isLoading}
              />
            </div>
            <div className="image-preview">
              {imagePreview && <img src={imagePreview} alt="Preview" className="imagePreview" />}
            </div>
            <button type="submit" className="signupBtn" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;