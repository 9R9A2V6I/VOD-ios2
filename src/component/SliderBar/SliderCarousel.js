import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { FaPlay } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SliderCarousel = ({ items }) => {
  const settings = {
    centerMode: true,
    centerPadding: '30px', // Adjust for desired padding
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    arrows: false,
  };

  const truncateText = (text = '', wordLimit = 16) =>
    text.split(' ').slice(0, wordLimit).join(' ') +
    (text.split(' ').length > wordLimit ? '...' : '');

  return (
    <Slider {...settings}>
      {items?.video_slider?.map((item, index) => (
        <div key={index} className="carousel-item">
          <img src={item?.image} alt="" />
          <div className="slider-text-box">
            <h2>{item?.title || '-'}</h2>
            <p>{truncateText(item?.description || '-')}</p>

            {item.external_url ? (
              <a
                href={item.button_url}
                target="_blank"
                rel="noopener noreferrer"
                className='play-button'
              >
                {item.button_text}
              </a>
            ) : (
              <NavLink
                to={`/video/${item.link_to_video}`}
                className="play-button"
              >
                <div className="play-button-icon">
                  <FaPlay />
                  Play
                </div>
              </NavLink>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SliderCarousel;
