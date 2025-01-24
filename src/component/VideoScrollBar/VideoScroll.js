// CategoryCarousel.js
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';


const ITEM_WIDTH = 300;

const VideoScroll = ({ items = [], buttonVisibility = { left: false, right: false }, onScroll }) => {
  const containerRef = useRef(null);

  return (
    <div className="cat-carousel-container">
      {buttonVisibility.left && (
        <MdArrowBackIos
          className="scroll-button left"
          size={40}
          onClick={() => onScroll(-ITEM_WIDTH)}
        />
      )}

      <div className="cat-carousel" ref={containerRef}>
        {items.map((item, index) => (
          <NavLink className="link-style" to={`/video/${item.ID}`} key={index}>
            <div className="cat-items">
              <img src={item.thumbnail} alt={item.title} />
              <div className="cat-items-dur">
                <p>{formatDuration(item.duration)}</p>
              </div>
            </div>
            <p>{item.title}</p>
          </NavLink>
        ))}
      </div>

      {buttonVisibility.right && (
        <MdArrowForwardIos
          className="scroll-button right"
          size={40}
          onClick={() => onScroll(ITEM_WIDTH)}
        />
      )}
    </div>
  );
};

// Helper function for formatting duration
const formatDuration = (duration) => {
  const parts = duration.split(':');
  return parts.length === 3 && parts[0] === '00' ? `${parts[1]}:${parts[2]}` : duration;
};

export default VideoScroll;
