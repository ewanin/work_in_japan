import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderSection from './components/HeaderSection';
import Home from './pages/Home';
import JobDetailPage from './components/JobDetailPage';
import JobListings from './pages/JobListings';
import AboutJapan from './pages/AboutJapan';
import Contact from './pages/Contact';
import { LanguageProvider } from './LanguageContext';

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <div className=" min-h-screen pb-[50px] font-poppins">
          <HeaderSection />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/jobs/:title" element={<JobDetailPage />} />
            <Route exact path="/jobs" element={<JobListings />} />
            <Route exact path="/about-japan" element={<AboutJapan />} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;