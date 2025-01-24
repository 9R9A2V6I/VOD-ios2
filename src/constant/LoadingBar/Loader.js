import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  const [animateClass, setAnimateClass] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateClass((prev) => !prev);
    }, 3000); // Toggle every 3 seconds (2500ms animation duration + 500ms delay)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <h1 className="loader-heading">Loading</h1>
      <div className={`dots ${animateClass ? 'dots--animate' : ''}`}>
        <span className="dot z"></span>
        <span className="dot f"></span>
        <span className="dot s"></span>
        <span className="dot t">
          <span className="dot l"></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
