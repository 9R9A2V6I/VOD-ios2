import React from 'react';
// import Navbar from '../../component/Navbar/Navbar';
import Carousel from '../../component/CarouselBar/Carousel';

import Slider from '../../component/SliderBar/Slider';
import FavoriteVideos from '../../component/FavoriteBar/FavoriteVideos';
function Home() {
  return (
    <>
      <Slider />
      <FavoriteVideos/>
      <Carousel/>
    </>
  );
}

export default Home;

