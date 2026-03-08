import React, { useState } from "react";
import "./AddProductPage.css";
import { addProduct, auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../Cloudnary/ImageService";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import OlxLogo from "../../assets/OlxLogo";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

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
      toast.error("Please log in to add a product");
      navigate("/login");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }
      const product = {
        productName,
        category,
        price: parseFloat(price),
        description,
        imageUrl,
        uid: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      };
      await addProduct(product);
      toast.success("Product added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(`Failed to add product: ${error.message}`);
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
                disabled={isLoading} // Disable input during loading
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
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;