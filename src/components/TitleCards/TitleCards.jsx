import React, { useState, useEffect, useRef } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category ? category : 'now_playing'
          }?language=en-US&page=1`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODc2MmQxYzNkYzQzNjYyZWE3NjBlMzU5YmUwNjgyMyIsInN1YiI6IjY1Y2JiYWY0YTM0OTExMDE0YTdjZTExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e1rVRNbEmXrFEAV3lUEiSMkCZ9jMGVIpIWr3antg3HI',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 6,
            },
            2100: {
              slidesPerView: 8,
            },
          }}
          spaceBetween={10}
          className='mySwiper'
        >
          {apiData.map((card, index) => (
            <SwiperSlide key={index}>
              <Link to={`/player/${card.id}`} className='card' key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.title}
                />
                <p>{card.original_title}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TitleCards;
