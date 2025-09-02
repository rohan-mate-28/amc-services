import { lazy, Suspense } from 'react';
const Navbar=lazy(()=>import("../components/shared/Navbar.jsx"));
import React from 'react';
const TermsAndConditions=lazy(()=>import('./TermsAndConditions.jsx'));
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
       <Suspense fallback={<div>Loading Products...</div>}>
        <ProductCarousel />
      </Suspense>

      <Suspense fallback={<div>Loading Stats...</div>}>
        <StatsSection />
      </Suspense>

     <Suspense fallback={<div>Loading Stats...</div>}>
        <TermsAndConditions />
      </Suspense>
      <Suspense fallback={<div>Loading FAQs...</div>}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<div>Loading Reviews...</div>}>
        <CustomerReviews />
      </Suspense>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home
