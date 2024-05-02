import React, { createContext, useState, useContext } from 'react';

// Create a context for managing language
const LanguageContext = createContext();

// LanguageProvider component to manage the language state
export const LanguageProvider = ({ children }) => {
    // State to manage the current language
    const [language, setLanguage] = useState('english');

    return (
        // Provide the language state and setter to the children components
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to consume the language context
export const useLanguage = () => useContext(LanguageContext);