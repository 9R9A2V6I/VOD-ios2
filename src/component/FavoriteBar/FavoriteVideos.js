import React, { useEffect, useState, Suspense, useContext } from 'react';
import './/../CarouselBar/Carousel.css';
import axios from 'axios';
import { apiURL } from '../../config';
import { NavLink } from 'react-router-dom';
import '../../constant/Css-Files/ConstStyle.css';
import { ThemeContext } from '../../store/ThemeContext';
import { NavLinkStyle } from '../../constant/Css-Files/NavlinkStyle';

// Lazy-load the CarouselScroll component
const CurouselScroll = React.lazy(() => import('../../utils/CarouselScroll'));

const FavoriteVideos = () => {
  const [catData, setCatData] = useState([]);

  const { fontColor } = useContext(ThemeContext); // Access the current font color

  // Fetch carousel data from the API
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

  // const visibleFavorites = catData.slice(0, 4); // Show only 4 favorites initially

  const formatDuration = (duration) => {
    const parts = duration.split(':');
    return parts.length === 3 && parts[0] === '00'
      ? `${parts[1]}:${parts[2]}`
      : duration;
  };

  return (
    <>
      {catData.length > 0 && (
        <div className="Fav-main-section">
          <div className="category-carousel">
            <div className="carousel-heading">
              {catData.length > 0 && (
                <h1 className="heading-font">Favorites</h1>
              )}
              {catData.length > 5 && (
                <NavLink style={NavLinkStyle(fontColor)} to="allFavorites">
                  <p
                    className="view-all-text"
                    style={{
                      color: fontColor
                        ? fontColor === 'white'
                          ? '#C4C4C4'
                          : '#666666'
                        : '#666666',
                    }}
                  >
                    View All
                  </p>
                </NavLink>
              )}
            </div>

            <div className="cat-carousel-container">
              <div className="cat-carousel">
                {catData.map((item, itemIndex) => (
                  <Suspense key={itemIndex}>
                    <CurouselScroll
                      to={`/video/${item.ID}`}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      duration={item.duration}
                      formatDuration={formatDuration}
                      loading="lazy"
                    />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteVideos;
