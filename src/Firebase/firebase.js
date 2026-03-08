import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Sign-up function
const signup = async (name, email, password, phoneNumber) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phoneNumber
    });
    console.log("New User Signed in");
  } catch (error) {
    console.error("Signup error:", error);
    throw error; // Let caller handle error
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in");
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Let caller handle error
  }
};

// Add product function
const addProduct = async (product) => {
  try {
    const res = await addDoc(collection(db, "products"), product);
    console.log("Product added with ID:", res.id);
    return res.id; // Return ID for caller
  } catch (error) {
    console.error("Error adding product:", error);
    throw error; // Let caller handle error
  }
};

// Update product function
const updateProduct = async (productId, updatedProduct) => {
  try {
    const productDoc = doc(db, "products", productId);
    await updateDoc(productDoc, updatedProduct);
    console.log("Product updated with ID:", productId);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Let caller handle error
  }
};

// Logout function
const logout = () => {
  signOut(auth);
  console.log("User logged out");
};

export {
  signup,
  login,
  logout,
  auth,
  addProduct,
  updateProduct,
  storage,
  db
};