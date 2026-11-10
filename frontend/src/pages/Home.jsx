import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BulkOrderBanner from '../components/home/BulkOrderBanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { ProductApplications } from '../components/home/IndustrialSections';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <main className="bg-[#F5F8FC] min-h-screen">
      <SEO
        title="ImageTech Industries | Manufacturer of Dyne Test Pens, Inks & Doctor Blades"
        description="ImageTech Industries is an ISO 9001:2015 certified manufacturer of MAGNET Dyne Test Pens, Dyne Test Inks, Doctor Blades and surface energy testing solutions in India."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.imagetechindustries.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.imagetechindustries.com/shop?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ImageTech Industries",
            "url": "https://www.imagetechindustries.com",
            "logo": "https://www.imagetechindustries.com/logo.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8448336036",
              "contactType": "technical sales",
              "areaServed": "Global",
              "availableLanguage": ["English", "Hindi"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "C-31, Nawada Housing Complex",
              "addressLocality": "New Delhi",
              "postalCode": "110059",
              "addressCountry": "IN"
            }
          }
        ]}
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Dyne Test Pen & Dyne Test Ink Showcase Sections */}
      <FeaturedProducts />

      {/* 5. Bulk Order Industrial Banner */}
      <BulkOrderBanner />

      {/* 6. Why Choose ImageTech Industries */}
      <WhyChooseUs />

      {/* 5. Product Applications / Industry Sectors */}
      <ProductApplications />

    </main>
  );
};

export default Home;
