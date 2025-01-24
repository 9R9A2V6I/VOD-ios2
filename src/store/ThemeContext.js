// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState('black'); // Default background color
  const [fontColor, setFontColor] = useState('white'); // Default font color

  const toggleTheme = () => {
    setBgColor((prevBgColor) => (prevBgColor === 'black' ? 'white' : 'black'));
    setFontColor((prevFontColor) =>
      prevFontColor === 'white' ? 'black' : 'white'
    );
  };

  return (
    <ThemeContext.Provider value={{ bgColor, fontColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
