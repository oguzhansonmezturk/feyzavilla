import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Location from './components/Location';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();

  // Set direction based on language
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="app-wrapper">
      <div className="grain"></div>
      <Navbar />
      <Hero />
      <About />
      <Amenities />
      <Gallery />
      <Location />
      <Reviews />
      <Contact />
      <Booking />
      <Footer />
    </div>
  );
}

export default App;
