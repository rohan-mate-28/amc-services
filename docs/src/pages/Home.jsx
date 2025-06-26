import Navbar from '../components/shared/Navbar.jsx';
import React from 'react'
import HeroSection from './HeroSection.jsx';
import Footer from './Footer.jsx';
import FAQSection from './FAQSection.jsx';
import ProductCarousel from './ProductCarousel.jsx';

const Home = () => {
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <ProductCarousel/>
       <FAQSection/>
       <Footer/>
    </div>
  )
}

export default Home
