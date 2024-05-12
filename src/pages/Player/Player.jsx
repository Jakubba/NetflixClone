import React, { useState, useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
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
          throw new Error('Failed to fetch video data');
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        } else {
          throw new Error('No video data available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideoData();
  }, [id]);

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt=''
        onClick={() => {
          navigate(-1);
        }}
      />
      {apiData.key && (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`} // Corrected the URL format for embedding YouTube videos
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      )}
      <div className='player-info'>
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
