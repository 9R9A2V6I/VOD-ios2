import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-vimeo';
import { CiSettings } from 'react-icons/ci';

const VideoDisplay = ({ url_hd, url_sd, url_embed }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [showQualitySelector, setShowQualitySelector] = useState(false);
  const [activeQuality, setActiveQuality] = useState('480p');

  const videoSources = useMemo(
    () => ({
      '480p': url_sd,
      '720p': url_hd,
    }),
    [url_sd, url_hd]
  );

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        muted: true,
        responsive: true,
        fluid: true,
      });

      // Set initial source based on url_embed type
      if (url_embed && url_embed.includes("vimeo.com")) {
        playerRef.current.src({
          src: url_embed,
          type: 'video/vimeo', // Specify Vimeo video type
        });
      } else {
        // Default to SD quality if no embed URL is provided or if it’s not Vimeo
        playerRef.current.src({
          src: videoSources['480p'],
          type: 'application/x-mpegURL',
        });
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [url_embed, videoSources]);

  const handleQualityChange = useCallback(
    (quality) => {
      if (playerRef.current) {
        const currentTime = playerRef.current.currentTime();

        playerRef.current.src({
          src: videoSources[quality],
          type: 'application/x-mpegURL',
        });

        const onLoadedMetadata = () => {
          setTimeout(() => {
            playerRef.current.currentTime(currentTime);
            playerRef.current.play();
          }, 50);
          playerRef.current.off('loadedmetadata', onLoadedMetadata);
        };

        playerRef.current.on('loadedmetadata', onLoadedMetadata);

        setActiveQuality(quality);
        setShowQualitySelector(false);
      }
    },
    [videoSources]
  );

  return (
    <div className="video-display-container">
      <div data-vjs-player className="video-wrapper">
        <video ref={videoRef} className="video-js vjs-default-skin" />

        {/* Show quality selector only if url_embed is not provided or not a Vimeo URL */}
        {(!url_embed || !url_embed.includes("vimeo.com")) && (
          <>
            <div
              className="settings-icon-quality"
              onClick={() => setShowQualitySelector((prev) => !prev)}
            >
              <CiSettings />
            </div>

            {showQualitySelector && (
              <div className="quality-selector">
                <div
                  className={`quality-option ${
                    activeQuality === '480p' ? 'active' : ''
                  }`}
                  onClick={() => handleQualityChange('480p')}
                >
                  SD
                </div>
                <div
                  className={`quality-option ${
                    activeQuality === '720p' ? 'active' : ''
                  }`}
                  onClick={() => handleQualityChange('720p')}
                >
                  HD
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoDisplay;
