import './App.css';
import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './AppRoutes';
import { ThemeContext } from './store/ThemeContext';


function App() {
  const { bgColor, fontColor } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = fontColor;
  }, [bgColor, fontColor]);

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: fontColor }}>
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
