import { lazy } from 'react';
const Navbar=lazy(()=>import("../components/shared/Navbar.jsx"));
import React from 'react'
const StatsSection = lazy(() => import('./StatsSection.jsx'));
const HeroSection=lazy(()=>import("./HeroSection.jsx"));
const Footer =lazy(()=>import ("./Footer.jsx"));
const FAQSection =lazy(()=>import("./FAQSection.jsx"));
const ProductCarousel=lazy(()=>import ("./ProductCarousel.jsx"));
const CustomerReviews=lazy(()=>import("./CustomerReviews.jsx"));
const Home = () => {
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <ProductCarousel/>
       <StatsSection/>
       <FAQSection/>
       <CustomerReviews/>
       {/* Add more sections as needed */}
       <Footer/>
    </div>
  )
}

export default Home
