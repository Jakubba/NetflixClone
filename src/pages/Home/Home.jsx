import React from 'react';
import './Home.css';

import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <img src={hero_banner} alt='image banner' className='banner-img' />
        <div className='hero-caption'>
          <img src={hero_title} alt='image title' className='caption-img'></img>
          <p>Discovering a whole new world of movies and TV.</p>
          <div className='hero-btns'>
            <button className='btn'>
              <img src={play_icon} alt='play icon'></img>Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt='info icon'></img>More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className='more-cards'>
        <TitleCards title={'New & Popular'} category={'top_rated'} />
        <TitleCards title={'Horror'} category={'popular'} />
        <TitleCards title={'Thriller'} category={'upcoming'} />
        <TitleCards title={'Comedy'} category={'now_playing'} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
