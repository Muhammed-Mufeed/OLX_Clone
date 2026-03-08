import React, { useEffect } from 'react'
import Homepage from './Pages/Homepage/Homepage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProductPage from './Pages/ProductPage/ProductPage'
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/Login/Login'
import AddProductPage from './Pages/AddProductPage/AddProductPage'
import EditProductPage from './Pages/EditProductPage/EditProductPage'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase/firebase'
import ContextProvider from './context/ContextProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        navigate('/');
        console.log("Logged In");
      } else {
        navigate('/login');
        console.log("Logged out");
      }
    })
  }, [])

  return (
    <ContextProvider>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addproduct' element={<AddProductPage />} />
        <Route path='/editproduct/:id' element={<EditProductPage />} />
      </Routes>
    </ContextProvider>
  )
}

export default App