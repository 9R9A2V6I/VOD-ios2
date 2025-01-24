import React, { useState, useEffect, useContext } from 'react';
import { apiURL } from '../../config';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeContext';
import { NavLinkStyle } from '../../constant/Css-Files/NavlinkStyle';
import './SingleInstructor.css';
import { formatDuration } from '../../utils/FormatDuration';

const SingleInstructor = () => {
  const [instructor, setinstructor] = useState([]);
  const { fontColor } = useContext(ThemeContext);

  const { instructorName } = useParams();


  const fetchCarouselData = async () => {
    try {
      const params = new URLSearchParams();
      params.append('action', 'get_single_instructor');
      params.append('slug', instructorName);
      params.append('per_page', 100);

      const response = await axios.post(`${apiURL}/admin-ajax.php`, params);
      setinstructor(response.data.data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };
  useEffect(() => {
    fetchCarouselData();
  }, []);

  
  return (
    <div className="instructor" style={{ color: fontColor }}>
      <img
        className=" instructorImg"
        src={instructor.instructor_image}
        alt=""
      />

      <div className="instructorContent">
        <p className="instructorType">Studio Instructor</p>

        <div className="instructorPersonal">
          <h1>{instructor.name}</h1>
          <div className="instrSocial">
            <a
              href={instructor.social?.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.6429 0H2.35714C1.73199 0 1.13244 0.248341 0.690391 0.690391C0.248341 1.13244 0 1.73199 0 2.35714L0 19.6429C0 20.268 0.248341 20.8676 0.690391 21.3096C1.13244 21.7517 1.73199 22 2.35714 22H9.0971V14.5205H6.00335V11H9.0971V8.31679C9.0971 5.26478 10.9141 3.57893 13.697 3.57893C15.0297 3.57893 16.4234 3.81661 16.4234 3.81661V6.81214H14.8878C13.3748 6.81214 12.9029 7.75107 12.9029 8.71406V11H16.2805L15.7403 14.5205H12.9029V22H19.6429C20.268 22 20.8676 21.7517 21.3096 21.3096C21.7517 20.8676 22 20.268 22 19.6429V2.35714C22 1.73199 21.7517 1.13244 21.3096 0.690391C20.8676 0.248341 20.268 0 19.6429 0Z"
                  fill={fontColor}
                />
              </svg>
            </a>
            <a
              href={instructor.social?.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0025 5.35948C7.88098 5.35948 5.36319 7.87783 5.36319 11C5.36319 14.1222 7.88098 16.6405 11.0025 16.6405C14.1239 16.6405 16.6417 14.1222 16.6417 11C16.6417 7.87783 14.1239 5.35948 11.0025 5.35948ZM11.0025 14.6671C8.98528 14.6671 7.3362 13.0225 7.3362 11C7.3362 8.97746 8.98037 7.33292 11.0025 7.33292C13.0245 7.33292 14.6687 8.97746 14.6687 11C14.6687 13.0225 13.0196 14.6671 11.0025 14.6671ZM18.1877 5.12875C18.1877 5.8602 17.5988 6.44438 16.8724 6.44438C16.1411 6.44438 15.5571 5.85529 15.5571 5.12875C15.5571 4.40221 16.146 3.81312 16.8724 3.81312C17.5988 3.81312 18.1877 4.40221 18.1877 5.12875ZM21.9227 6.46402C21.8393 4.70166 21.4368 3.14058 20.146 1.8544C18.8601 0.568225 17.2994 0.165681 15.5374 0.0773179C13.7215 -0.0257726 8.27853 -0.0257726 6.46258 0.0773179C4.70552 0.160772 3.14479 0.563316 1.85399 1.84949C0.56319 3.13567 0.165644 4.69675 0.0773006 6.45911C-0.0257669 8.27547 -0.0257669 13.7196 0.0773006 15.536C0.160736 17.2983 0.56319 18.8594 1.85399 20.1456C3.14479 21.4318 4.70061 21.8343 6.46258 21.9227C8.27853 22.0258 13.7215 22.0258 15.5374 21.9227C17.2994 21.8392 18.8601 21.4367 20.146 20.1456C21.4319 18.8594 21.8344 17.2983 21.9227 15.536C22.0258 13.7196 22.0258 8.28037 21.9227 6.46402ZM19.5767 17.4849C19.1939 18.4471 18.4528 19.1883 17.4859 19.5761C16.038 20.1505 12.6025 20.018 11.0025 20.018C9.40245 20.018 5.96196 20.1456 4.51902 19.5761C3.55705 19.1932 2.81595 18.452 2.42822 17.4849C1.85399 16.0367 1.9865 12.6004 1.9865 11C1.9865 9.39964 1.8589 5.95838 2.42822 4.51512C2.81104 3.55294 3.55215 2.81167 4.51902 2.42385C5.96687 1.84949 9.40245 1.98204 11.0025 1.98204C12.6025 1.98204 16.0429 1.8544 17.4859 2.42385C18.4479 2.80676 19.189 3.54803 19.5767 4.51512C20.1509 5.96329 20.0184 9.39964 20.0184 11C20.0184 12.6004 20.1509 16.0416 19.5767 17.4849Z"
                  fill={fontColor}
                />
              </svg>
            </a>
            <a
              href={instructor.social?.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 0C5.15181 0 0 5.15181 0 11.5C0 17.8482 5.15181 23 11.5 23C17.8482 23 23 17.8482 23 11.5C23 5.15181 17.8482 0 11.5 0ZM16.1696 16.9208C15.9748 16.9208 15.8542 16.8605 15.6734 16.7538C12.7798 15.0103 9.41331 14.9361 6.08851 15.6177C5.90766 15.6641 5.67117 15.7383 5.53669 15.7383C5.0869 15.7383 4.80403 15.3813 4.80403 15.0056C4.80403 14.528 5.08689 14.3008 5.43468 14.2266C9.23246 13.3873 13.1137 13.4615 16.4246 15.4415C16.7075 15.6224 16.8744 15.7847 16.8744 16.2067C16.8744 16.6286 16.5452 16.9208 16.1696 16.9208ZM17.4169 13.8788C17.1758 13.8788 17.0135 13.7722 16.8466 13.6841C13.9484 11.9683 9.62661 11.2774 5.78246 12.3208C5.55988 12.381 5.43931 12.4413 5.23065 12.4413C4.73448 12.4413 4.33105 12.0379 4.33105 11.5417C4.33105 11.0456 4.57218 10.7163 5.0498 10.5819C6.33891 10.2202 7.65585 9.95121 9.58488 9.95121C12.5944 9.95121 15.5018 10.6978 17.7925 12.0611C18.1681 12.2837 18.3165 12.5712 18.3165 12.9746C18.3119 13.4754 17.9224 13.8788 17.4169 13.8788ZM18.8544 10.3454C18.6133 10.3454 18.4649 10.2851 18.2563 10.1645C14.9546 8.19375 9.05161 7.72077 5.23065 8.7873C5.06371 8.83367 4.85504 8.90786 4.63246 8.90786C4.02036 8.90786 3.55202 8.43024 3.55202 7.81351C3.55202 7.18286 3.94153 6.82581 4.35887 6.70524C5.99113 6.22762 7.81815 6.0004 9.80746 6.0004C13.1925 6.0004 16.7399 6.70524 19.3321 8.21694C19.6938 8.4256 19.9302 8.71311 19.9302 9.26492C19.9302 9.89557 19.4202 10.3454 18.8544 10.3454Z"
                  fill={fontColor}
                />
              </svg>
            </a>
          </div>
        </div>
        <p className="instructorDecri">{instructor.description}</p>
        <div className="cat-videos-container">
          {instructor.repeater?.map((item) => (
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

export default SingleInstructor;
