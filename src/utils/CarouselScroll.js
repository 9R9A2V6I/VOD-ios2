// CustomNavLink.js

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../store/ThemeContext';
import { NavLinkStyle } from '../constant/Css-Files/NavlinkStyle';

const CurouselScroll = ({
  to,
  title,
  thumbnail,
  duration,
  formatDuration,
  onClick,
}) => {
  const { fontColor } = useContext(ThemeContext);

  return (
    <NavLink style={NavLinkStyle(fontColor)} to={to} onClick={onClick}>
      <div className="cat-items2 ">
        <img src={thumbnail} alt={title} loading="lazy" />
        <div className="cat-items-dur">
          <p>{formatDuration(duration)}</p>
        </div>
      </div>
      <p className="title-font">{title}</p>
    </NavLink>
  );
};

export default CurouselScroll;
