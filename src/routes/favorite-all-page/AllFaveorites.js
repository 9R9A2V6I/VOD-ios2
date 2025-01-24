import React, { useState, useEffect, useContext } from 'react';
import { apiURL } from '../../config';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeContext';
import { NavLinkStyle } from '../../constant/Css-Files/NavlinkStyle';

const AllFaveorites = () => {
  const [catData, setCatData] = useState([]);
  const { fontColor } = useContext(ThemeContext);

  const fetchCarouselData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/admin-ajax.php?action=get_favorite&per_page=15`
      );
      setCatData(response.data.data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const formatDuration = (duration) => {
    const parts = duration.split(':');
    return parts.length === 3 && parts[0] === '00'
      ? `${parts[1]}:${parts[2]}`
      : duration;
  };

  return (
    <div className="cat-container">
      <div className="category-main">
        <div className="category-detail">
          <h1 className="heading-font">Favorites</h1>
        </div>
        <div className="cat-videos-container">
          {catData?.map((item) => (
            <NavLink
              style={NavLinkStyle(fontColor)}
              to={`/video/${item.ID}`}
              key={item.ID}
            >
              <div className="cat-items">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cat-items-dur-c">
                  <p>{formatDuration(item.duration)}</p>
                </div>
              </div>
              <p className="title-font">{item.title}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFaveorites;
