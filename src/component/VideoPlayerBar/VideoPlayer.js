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
import 'plyr-react/plyr.css';
import { formatDuration } from '../../utils/FormatDuration';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { bgColor, fontColor } = useContext(ThemeContext);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [fadeKey, setFadeKey] = useState(false);
  const [keyPosition, setKeyPosition] = useState({ top: 0, left: 0 });

  const closeIconTimer = useRef(null);

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
  const sessionUser = JSON.parse(sessionStorage.getItem('userData'));
  useEffect(() => {
    // Get user data from session storage when component mounts

    if (sessionUser) {
      setUser(sessionUser);
      // Check if videoId is already in the user's favorites
      if (
        sessionUser.favorite &&
        sessionUser.favorite.indexOf(parseInt(id)) !== -1
      ) {
        setIsFavorited(true);
      }
    }
  }, [id]);

  const toggleFavorite = async () => {
    if (!user) return; // Return early if user is not found

    const videoIdInt = parseInt(id);

    // Temporary copy of user's favorite list
    let tempFavorite = [...(user.favorite || [])];

    if (tempFavorite.indexOf(videoIdInt) === -1) {
      // Video is not in favorites; add it
      tempFavorite.push(videoIdInt);
      setIsFavorited(true); // Update local state
      console.log('add');
    } else {
      // Video is already in favorites; remove it
      const index = tempFavorite.indexOf(videoIdInt);
      if (index !== -1) tempFavorite.splice(index, 1); // Remove video
      setIsFavorited(false); // Update local state
      console.log('remove');
    }

    // Prepare the payload to send to the server
    const params = new URLSearchParams();
    params.append('action', 'save_favorite');

    // Append each video ID in the list to the payload as favorite_video[]
    tempFavorite.forEach((vid) => {
      params.append('favorite_video[]', vid);
    });

    try {
      await axios.post('/wp-admin/admin-ajax.php', params);

      // Dispatch or update the user state with the new favorite list
      const updatedUser = { ...user, favorite: tempFavorite };
      setUser(updatedUser);
      sessionStorage.setItem('userData', JSON.stringify(updatedUser)); // Update session storage
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const showCloseIconWithFade = () => {
    setShowCloseIcon(true); // Show icon
    clearTimeout(closeIconTimer.current); // Clear any existing timer
    closeIconTimer.current = setTimeout(() => setShowCloseIcon(false), 5000); // Hide icon after 5 seconds
  };

  const handleVideoClick = () => {
    showCloseIconWithFade(); // Show icon and reset fade-out timer on click
  };

  useEffect(() => {
    // Initial display of close icon with fade-out timer
    showCloseIconWithFade();

    // Add scroll listener

    return () => {
      clearTimeout(closeIconTimer.current); // Clear timer on unmount
    };
  }, []);

  const handleEquipmentClick = (key, event) => {
    if (selectedEquipment === key) {
      setSelectedEquipment(null); // Deselect if clicked again
    } else {
      setSelectedEquipment(key);

      // Get the position of the clicked equipment item
      const rect = event.target.getBoundingClientRect();
      setKeyPosition({
        top: rect.bottom + window.scrollY, // Position the key just below the icon
        left: rect.left + rect.width / 2, // Center it horizontally with the icon
      });

      setFadeKey(true); // Fade the key when a new equipment is clicked
    }
  };

  const handleOverlayClick = (e) => {
    // Prevent click event from propagating to the video itself
    e.stopPropagation();
    handleVideoClick();
  };

  const handleNavigation = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  if (isError)
    return <div>{error?.message || 'Error fetching video data'}</div>;

  const equipmentStyle = {
    filter: bgColor === 'white' ? 'none' : 'invert(100%)',
    // backgroundColor: fontColor,
    padding: '2px',
    borderRadius: '10px',
  };

  const categoryBtnStyle =
    bgColor === 'white'
      ? { border: `1.5px solid black `, color: 'black' }
      : {
          border: `1.5px solid White `,
          color: 'White',
        };

  const renderVideoContent = () => {
    if (videoData.embed && sessionUser?.active) {
      return (
        <div
          className="video-container-embed"
          onClick={handleOverlayClick}
          style={{ position: 'relative' }}
        >
          <div
            className="plyr plyr__video-embed skinless-embed"
            onClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: videoData.embed }}
            style={{
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              overflow: 'hidden',
              marginTop: '8px',
            }}
          />

          {/* Transparent overlay to capture clicks */}
          <div
            className="click-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              pointerEvents: showCloseIcon ? 'none' : 'auto',
            }}
          />

          {showCloseIcon && (
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="crossIcon"
              onClick={handleNavigateHome}
              style={{
                position: 'absolute', // Make sure it's on top
                top: '10px',
                right: '10px',
                transition: 'opacity 0.5s ease-in-out',
                opacity: showCloseIcon ? 1 : 0,
              }}
            >
              <circle cx="17" cy="17" r="17" fill="#292824" fillOpacity="0.6" />
              <path d="M10 10L23 23" stroke="white" strokeWidth="2" />
              <path d="M10 23L23 10" stroke="white" strokeWidth="2" />
            </svg>
          )}
        </div>
      );
    }
    if (videoData.url_hd || videoData.url_sd) {
      return (
        <VideoDisplay
          showCloseIcon={showCloseIcon}
          handleNavigateHome={handleNavigateHome}
          handleVideoClick={handleVideoClick}
          url_hd={videoData.url_hd}
          url_sd={videoData.url_sd}
        />
      );
    }
    return (
      <div className="video-container" onClick={handleVideoClick}>
        {showCloseIcon && (
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="crossIcon"
            onClick={handleNavigateHome}
            style={{
              transition: 'opacity 0.5s ease-in-out',
              opacity: showCloseIcon ? 1 : 0,
            }}
          >
            <circle cx="17" cy="17" r="17" fill="#292824" fill-opacity="0.6" />
            <path d="M10 10L23 23" stroke="white" stroke-width="2" />
            <path d="M10 23L23 10" stroke="white" stroke-width="2" />
          </svg>
        )}
        <div
          className="video-img-box"
          style={{ backgroundImage: `url(${videoData?.thumbnail || ''})` }}
        />
        <div className="overlay">
          <h2>Sign Up To Access</h2>
          <p> To purchase Video On Demand access please visit our website.</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {videoData && renderVideoContent()}

      {/* Video Title and Favorites */}
      <div className="video-title-container">
        <div className="video-title-head">
          {videoData?.categories?.length > 0 && (
            <NavLink
              style={NavLinkStyle(fontColor)}
              to={`/category/${videoData.categories[0].slug}`}
            >
              <div className="category-btn" style={categoryBtnStyle}>
                {videoData.categories[0].name}
              </div>
            </NavLink>
          )}

          <div className="video-title-right">
            {videoData && sessionUser?.active && (
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

        {/* Video Details Section */}
        <div className="video-details-holder">
          {videoData?.title && (
            <p className="video-details-title">{videoData?.title || '-'}</p>
          )}

          {/* About Section */}
          {videoData?.about && (
            <div className="video-about-section">
              <h1 className="heading-font-video ">About</h1>
              <p
                className="title-font"
                dangerouslySetInnerHTML={{ __html: videoData.about }}
              />
            </div>
          )}

          {/* Equipment Section */}

          {videoData?.equipments &&
            Object.keys(videoData.equipments).length > 0 && (
              <div className="video-about-section">
                <h1 className="heading-font-video-equip">Equipment</h1>
                <div className="equipment-items-box">
                  {Object.entries(videoData.equipments).map(([key, src]) => (
                    <div
                      key={key}
                      className="equipment-item"
                      style={equipmentStyle}
                      onClick={(e) => handleEquipmentClick(key, e)} // Pass the event to get position
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
                {selectedEquipment && (
                  <div
                    className={`equipment-key-display ${fadeKey ? 'fade' : ''}`}
                    style={{
                      position: 'absolute',
                      top: `${keyPosition.top + 3}px`, // Position it 5px below the clicked icon
                      left: `${keyPosition.left}px`, // Center it horizontally
                      transform: 'translateX(-50%)',
                      transition: 'opacity 0.5s ease-out',
                      background: fontColor ? 'white' : 'black',
                      color: fontColor ? 'black' : 'white',
                    }}
                  >
                    <p>{selectedEquipment}</p>
                  </div>
                )}
              </div>
            )}

          {videoData?.related_video?.length > 0 && (
            <h1 className="heading-font-video-relate">Related</h1>
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
