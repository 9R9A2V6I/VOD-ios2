import React, { useEffect, useState, Suspense, useContext } from 'react';
import './Carousel.css';
import axios from 'axios';
import { apiURL } from '../../config';
import { NavLink } from 'react-router-dom';
import '../../constant/Css-Files/ConstStyle.css';
import { ThemeContext } from '../../store/ThemeContext';
import { NavLinkStyle } from '../../constant/Css-Files/NavlinkStyle';
import { formatDuration } from '../../utils/FormatDuration';

// Lazy-load the CarouselScroll component
const CurouselScroll = React.lazy(() => import('../../utils/CarouselScroll'));

const Carousel = () => {
  const [catData, setCatData] = useState([]);

  const { fontColor } = useContext(ThemeContext); // Access the current font color

  const fetchCarouselData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/admin-ajax.php?action=category_carousel`
      );
      setCatData(response.data.data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };

  // Fetch SliderData

  useEffect(() => {
    fetchCarouselData();
  }, []);

 

  const truncateTitle = (title) =>
    title.length > 20 ? `${title.slice(0, 17)}...` : title;

  return (
    <>
      <div className="category-main-section">
        {catData.map((categoryItem, categoryIndex) => (
          <div className="category-carousel" key={categoryIndex}>
            <div className="carousel-heading">
              <h1 className="heading-font">{categoryItem.category.name}</h1>
              <NavLink
                style={NavLinkStyle(fontColor)}
                to={`category/${categoryItem.category.slug}`}
              >
                <p
                  className="view-all-text"
                  style={{
                    color: fontColor
                      ? fontColor === 'white'
                        ? '#fff'
                        : '#737373'
                      : '#737373',
                  }}
                >
                  View All
                </p>
              </NavLink>
            </div>

            <div className="cat-carousel-container">
              <div className="cat-carousel">
                {categoryItem.data.map((item, itemIndex) => (
                  <Suspense key={itemIndex}>
                    <CurouselScroll
                      to={`/video/${item.ID}`}
                      title={truncateTitle(item.title)}
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
        ))}
      </div>
    </>
  );
};

export default Carousel;
