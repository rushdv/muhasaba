import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'bn' : 'en'));
    };

    const t = (key, variables = {}) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value !== undefined && value !== null && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if translation key is missing
                let fallback = translations['en'];
                for (const fk of keys) {
                    if (fallback !== undefined && fallback !== null && typeof fallback === 'object' && fk in fallback) {
                        fallback = fallback[fk];
                    } else {
                        fallback = key;
                        break;
                    }
                }
                value = fallback;
                break;
            }
        }

        if (typeof value === 'string') {
            Object.entries(variables).forEach(([k, v]) => {
                value = value.replace(`{${k}}`, v);
            });
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
