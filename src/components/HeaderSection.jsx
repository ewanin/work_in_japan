import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import languages from '../../public/languages';
import { useLanguage } from '../LanguageContext';

const HeaderSection = () => {
    // State and Context
    const { language, setLanguage } = useLanguage();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Data based on selected language
    let data;
    switch (language) {
        case 'english':
            data = enData;
            break;
        case 'japanese':
            data = jpData;
            break;
        default:
            data = enData;
    }

    // Toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const header = document.querySelector('.header');
            if (!header.contains(event.target)) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    // Close menu
    const closeMenu = () => {
        setIsOpen(false);
    };

    // JSX
    return (
        <header className="bg-white shadow-md header fixed top-0 z-20 w-full">
            <div className="container mx-auto py-3 px-4 md:px-8 flex justify-between md:items-center items-start">
                {/* Logo */}
                <Link className="text-xl font-bold text-gray-800 flex items-center" to={"/"}>
                    <img src={data.translation.menu.logoAni} alt="Logo" className='h-[50px]' />
                    <img src={data.translation.menu.logo} alt="Logo" className='h-[50px]' />
                </Link>

                {/* Mobile Menu Icon */}
                <div className="block md:hidden">
                    <div className=' text-right'>
                        <button onClick={toggleMenu}>
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {/* Mobile Menu Links */}
                    {isOpen && (
                        <nav className="flex flex-col text-right gap-3 mt-2">
                            <Link to="/" className={`text-[#04ADE6] ${location.pathname === '/' ? 'font-bold' : ''}`} onClick={closeMenu}>{data.translation.menu.home}</Link>
                            <Link to="/jobs" className={`text-[#04ADE6] ${location.pathname === '/jobs' ? 'font-bold' : ''}`} onClick={closeMenu}>{data.translation.menu.job_listing}</Link>
                            <Link to="/about-japan" className={`text-[#04ADE6] ${location.pathname === '/about-japan' ? 'font-bold' : ''}`} onClick={closeMenu}>{data.translation.menu.about}</Link>
                            <Link to="/contact" className={`text-[#04ADE6] ${location.pathname === '/contact' ? 'font-bold' : ''}`} onClick={closeMenu}>{data.translation.menu.contact}</Link>
                            {/* Language Selection */}
                            <select className="bg-transparent border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}>
                                {languages.langData.map((item) => (
                                    <option key={item.id} value={item.value}>{item.name}</option>
                                ))}
                            </select>
                        </nav>
                    )}
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:block space-x-4">
                    <Link to="/" className={`text-[#04ADE6] ${location.pathname === '/' ? 'font-bold' : ''}`}>{data.translation.menu.home}</Link>
                    <Link to="/jobs" className={`text-[#04ADE6] ${location.pathname === '/jobs' ? 'font-bold' : ''}`}>{data.translation.menu.job_listing}</Link>
                    <Link to="/about-japan" className={`text-[#04ADE6] ${location.pathname === '/about-japan' ? 'font-bold' : ''}`}>{data.translation.menu.about}</Link>
                    <Link to="/contact" className={`text-[#04ADE6] ${location.pathname === '/contact' ? 'font-bold' : ''}`}>{data.translation.menu.contact}</Link>
                </nav>

                {/* Language Selection for Desktop */}
                <div className="hidden md:block">
                    <select className="bg-transparent border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}>
                        {languages.langData.map((item) => (
                            <option key={item.id} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;