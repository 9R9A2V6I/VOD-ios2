import React ,{useState,useEffect} from 'react';
import SliderCarousel from './SliderCarousel';
import axios from 'axios';
import './Slider.css';
import { apiURL } from '../../config';

const Slider = () => {
  
  const [slides, setSlides] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/admin-ajax.php?action=get_self`
        );
        setSlides(response?.data?.data);
      } catch (err) {
        setIsError(true);
        setError(err.message || 'Error fetching slider data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className='slider-container'>
      <SliderCarousel items={slides} />
    </div>
  );
};

export default Slider;
