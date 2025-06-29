import { lazy } from 'react';
const Navbar=lazy(()=>import("../components/shared/Navbar.jsx"));
import React from 'react'
const HeroSection=lazy(()=>import("./HeroSection.jsx"));
const Footer =lazy(()=>import ("./Footer.jsx"));
const FAQSection =lazy(()=>import("./FAQSection.jsx"));
const ProductCarousel=lazy(()=>import ("./ProductCarousel.jsx"));
 
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
