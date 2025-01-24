import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { CiSettings } from 'react-icons/ci';

const VideoDisplay = ({
  url_hd,
  url_sd,
  showCloseIcon,
  handleVideoClick,
  handleNavigateHome,
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [showQualitySelector, setShowQualitySelector] = useState(false);
  const [activeQuality, setActiveQuality] = useState('480p');

  const videoSources = {
    '480p': url_sd,
    '720p': url_hd,
  };

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        muted: true,
        responsive: true,
        fluid: true,
      });

      playerRef.current.src({
        src: videoSources[activeQuality],
        type: 'application/x-mpegURL',
      });
    }

    return () => {
      if (playerRef.current) playerRef.current.dispose();
    };
  }, []);

  const handleQualityChange = (quality) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.currentTime();

      playerRef.current.src({
        src: videoSources[quality],
        type: 'application/x-mpegURL',
      });

      playerRef.current.on('loadedmetadata', () => {
        playerRef.current.currentTime(currentTime);
        playerRef.current.play();
      });

      setActiveQuality(quality);
      setShowQualitySelector(false);
    }
  };

  const handleOverlayClick = (e) => {
    // Prevent click event from propagating to the video itself
    e.stopPropagation();
    handleVideoClick();
  };

  return (
    <div className="video-display-container">
      {/* Transparent overlay to capture clicks, but avoid interfering with video interaction */}
      <div
        className="click-overlay"
        onClick={handleOverlayClick}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 1,
          pointerEvents: showCloseIcon ? 'none' :'auto', // Only capture clicks when close icon is shown
        }}
      />
      <div data-vjs-player className="video-wrapper">
        <video ref={videoRef} className="video-js vp-center vjs-default-skin" onClick={(e) => e.stopPropagation()} />
        
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
            <circle cx="17" cy="17" r="17" fill="#292824" fillOpacity="0.6" />
            <path d="M10 10L23 23" stroke="white" strokeWidth="2" />
            <path d="M10 23L23 10" stroke="white" strokeWidth="2" />
          </svg>
        )}

        {/* Custom Settings Icon */}
        <div
          className="settings-icon-quality"
          onClick={() => setShowQualitySelector((prev) => !prev)}
        >
          <CiSettings />
        </div>

        {/* Quality Selector Popup */}
        {showQualitySelector && (
          <div className="quality-selector">
            <div
              className={`quality-option ${activeQuality === '480p' ? 'active' : ''}`}
              onClick={() => handleQualityChange('480p')}
            >
              SD
            </div>
            <div
              className={`quality-option ${activeQuality === '720p' ? 'active' : ''}`}
              onClick={() => handleQualityChange('720p')}
            >
              HD
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDisplay;
