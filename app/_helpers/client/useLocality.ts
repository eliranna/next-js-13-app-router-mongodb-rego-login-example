import { useState, useEffect } from 'react';

// Define a type for the language settings
type LanguageSetting = {
  language: string;
  ISOCode: string;
  direction: 'ltr' | 'rtl';
  langAttribute: string;
};

// Define a type for the supported languages
type LanguageKey = 'english' | 'hebrew'; // Extend this union type as you add more languages

// Language settings object with typed keys
const languageSettings: Record<LanguageKey, LanguageSetting> = {
  english: {
    language: 'English',
    ISOCode: 'EN',
    direction: 'ltr',
    langAttribute: 'en',
  },
  hebrew: {
    language: 'Hebrew',
    ISOCode: 'HE',
    direction: 'rtl',
    langAttribute: 'he',
  },
  // Add more languages here...
};

// Define the return type of the useLocality hook
type UseLocalityReturn = {
  language: string;
  ISOCode: string;
  direction: 'ltr' | 'rtl';
  setLanguage: (languageKey: LanguageKey) => void;
};

const useLocality = (): UseLocalityReturn => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('english');

  const setLanguage = (languageKey: LanguageKey) => {
    if (languageSettings[languageKey]) {
      setCurrentLanguage(languageKey);
    } else {
      console.warn(`Language ${languageKey} is not supported.`);
    }
  };

  // Fetch and return the current language settings
  const { language, ISOCode, direction, langAttribute } = languageSettings[currentLanguage];

  // Automatically adjust the page direction and lang attribute based on the current language
  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = langAttribute;
  }, [direction, langAttribute]);

  return { language, ISOCode, direction, setLanguage };
};

export default useLocality;
