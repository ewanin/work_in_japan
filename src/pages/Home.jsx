import React from 'react';
import MainContentSection from '../components/MainContentSection';
import AboutJapanSection from '../components/AboutJapanSection';

const Home = () => {
    // JSX
    return (
        <div className='relative top-[50px] z-10 mx-auto'>
            {/* Main Content Section */}
            <MainContentSection />
            {/* About Japan Section */}
            <AboutJapanSection />
        </div>
    );
};

export default Home;