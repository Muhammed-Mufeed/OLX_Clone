import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import SubNav from '../../Components/SubNav/SubNav'
import RecommendedProducts from '../../Components/RecommendedProduct/RecommendedProduct'
import Footer from '../../Components/Footer/Footer'

const Homepage = () => {
  return (
    <div className='home'>
      <Navbar />
      <SubNav />
      <RecommendedProducts />
      <Footer />
    </div>
  )
}

export default Homepage
