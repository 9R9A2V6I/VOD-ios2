// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState('white'); // default background color
  const [fontColor, setFontColor] = useState('#17181C')


  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor, fontColor, setFontColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
