import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import axios from 'axios';
import { apiURL } from '../../config';

import { ThemeContext } from '../../store/ThemeContext';
import CarouselScroll from '../../utils/CarouselScroll';
import './VideoPlayer.css';
import VideoDisplay from './VideoDisplay';
import { NavLinkStyle } from '../../constant/Css-Files/NavlinkStyle';

import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { bgColor, fontColor } = useContext(ThemeContext);

  const playerRef = useRef(null); // Ref to store Plyr instance

  // Fetch video data from API
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.post(
          `${apiURL}/admin-ajax.php`,
          new URLSearchParams({
            action: 'get_video',
            post_id: id,
          })
        );
        setVideoData(response.data.data);
      } catch (err) {
        setIsError(true);
        setError(err);
      }
    };

    fetchVideoData();
  }, [id]);

  // Fetch existing favorites and check if the current video is a favorite
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('userData'));
    if (sessionUser) {
      setUser(sessionUser);
      if (
        sessionUser.favorite &&
        sessionUser.favorite.indexOf(parseInt(id)) !== -1
      ) {
        setIsFavorited(true);
      }
    }
  }, [id]);

  useEffect(() => {
    // Clean up Plyr instance on unmount
    return () => {
      if (playerRef.current && playerRef.current.plyr) {
        playerRef.current.plyr.destroy();
      }
    };
  }, []);

  const toggleFavorite = async () => {
    if (!user) return;

    const videoIdInt = parseInt(id);
    let tempFavorite = [...(user.favorite || [])];

    if (tempFavorite.indexOf(videoIdInt) === -1) {
      tempFavorite.push(videoIdInt);
      setIsFavorited(true);
      console.log('add');
    } else {
      const index = tempFavorite.indexOf(videoIdInt);
      if (index !== -1) tempFavorite.splice(index, 1);
      setIsFavorited(false);
      console.log('remove');
    }

    const params = new URLSearchParams();
    params.append('action', 'save_favorite');
    tempFavorite.forEach((vid) => {
      params.append('favorite_video[]', vid);
    });

    try {
      await axios.post('/wp-admin/admin-ajax.php', params);
      const updatedUser = { ...user, favorite: tempFavorite };
      setUser(updatedUser);
      sessionStorage.setItem('userData', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const formatDuration = (duration = '00:00:00') => {
    const parts = duration.split(':');
    return parts.length === 3 && parts[0] === '00'
      ? `${parts[1]}:${parts[2]}`
      : duration;
  };

  const handleNavigation = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  if (isError)
    return <div>{error?.message || 'Error fetching video data'}</div>;

  const equipmentStyle =
    bgColor === 'white'
      ? {}
      : {
          backgroundColor: fontColor,
          padding: '2px',
          borderRadius: '10px',
        };

  const renderVideoContent = () => {
    if (videoData.url_hd || videoData.url_sd || videoData.embed) {
      const iframeHtml = `${videoData.embed}`;
      const srcMatch = iframeHtml.match(/<iframe[^>]+src="([^"]+)"/i);
      const src = srcMatch ? srcMatch[1] : null;
      console.log(src)

      return (
        <VideoDisplay
          url_hd={videoData.url_hd}
          url_sd={videoData.url_sd}
          url_embed={src}
        />
      );
    }
    return (
      <div className="video-container">
        <div
          className="video-img-box"
          style={{ backgroundImage: `url(${videoData?.thumbnail || ''})` }}
        />
        <div className="overlay">
          <h2>Sign Up To Access</h2>
          <p>Please visit [vod site URL] to purchase Video On Demand access</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {videoData && renderVideoContent()}

      <div className="video-title-container">
        <div className="video-title-head">
          {videoData?.categories?.length > 0 && (
            <NavLink
              style={NavLinkStyle(fontColor)}
              to={`/category/${videoData.categories[0].slug}`}
            >
              <div className="category-btn">{videoData.categories[0].name}</div>
            </NavLink>
          )}

          <div className="video-title-right">
            {videoData && (
              <>
                <p>Add to favorites</p>
                <span onClick={toggleFavorite}>
                  {isFavorited ? (
                    <IoIosHeart className="heart-icon" color="#FF6600" />
                  ) : (
                    <IoIosHeartEmpty className="heart-icon" color="#FF6600" />
                  )}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="video-details-holder">
          {videoData?.title && (
            <p className="video-details-title">{videoData?.title || '-'}</p>
          )}

          {videoData?.about && (
            <div className="video-about-section">
              <h1 className="heading-font">About</h1>
              <p
                className="title-font"
                dangerouslySetInnerHTML={{ __html: videoData.about }}
              />
            </div>
          )}

          {videoData?.equipments &&
            Object.keys(videoData.equipments).length > 0 && (
              <div className="video-about-section">
                <h1 className="heading-font">Equipment</h1>
                <div className="equipment-items-box">
                  {Object.entries(videoData.equipments).map(([key, src]) => (
                    <div
                      key={key}
                      className="equipment-item"
                      style={equipmentStyle}
                    >
                      <img
                        src={src || 'default-equipment.svg'}
                        alt={key}
                        className="equipment-svg"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          {videoData?.related_video?.length > 0 && (
            <h1 className="heading-font">Related</h1>
          )}
        </div>

        {videoData?.related_video?.length > 0 && (
          <div className="video-related-section">
            <div className="cat-carousel-container">
              <div className="cat-carousel">
                {videoData.related_video.map((item, itemIndex) => (
                  <CarouselScroll
                    key={itemIndex}
                    title={item.title || '-'}
                    thumbnail={item.thumbnail || 'default-thumbnail.jpg'}
                    duration={item.duration}
                    formatDuration={formatDuration}
                    onClick={() => handleNavigation(item.ID)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
