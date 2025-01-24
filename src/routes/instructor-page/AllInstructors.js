import React, { useState, useEffect, useContext } from 'react';
import { apiURL } from '../../config';
import axios from 'axios';
import '../category-page/Category.css';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeContext';

import { NavLinkStyle } from '../../constant/Css-Files/NavlinkStyle';

const AllInstructors = () => {
  const [catData, setCatData] = useState([]);
  const { fontColor } = useContext(ThemeContext);

  const fetchCarouselData = async () => {
    try {
      const params = new URLSearchParams();
      params.append('action', 'get_instructor');

      const response = await axios.post(`${apiURL}/admin-ajax.php`, params);
      setCatData(response.data.data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  return (
    <>
      <div className="cat-container">
        <div className="category-main">
          <div className="cat-videos-container">
            {catData?.map((item) => (
              <>
                {item.instructor_image && (
                  <NavLink
                    style={NavLinkStyle(fontColor)}
                    to={`/instructors/${item?.slug}`}
                    className="instructorContainer"
                    key={item.ID}
                  >
                    <div className="cat-items">
                      <img src={item.instructor_image} alt={item.title} />
                    </div>
                    <p className="title-font">{item.name}</p>
                  </NavLink>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInstructors;
