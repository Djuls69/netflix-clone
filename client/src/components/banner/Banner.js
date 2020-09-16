import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from 'axios'
import Navbar3 from '../navbar3/Navbar3'

const key = process.env.REACT_APP_IMDB_KEY
const imagePath = 'https://image.tmdb.org/t/p/original'

const Banner = () => {
  const [result, setResult] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`)
      .then(res => setResult(res.data.results[Math.floor(Math.random() * res.data.results.length)]))
  }, [])

  return (
    <div
      className='banner'
      style={{
        background:
          result &&
          `url(${imagePath}${result.backdrop_path})
        no-repeat top center/cover`
      }}
    >
      <Navbar3 />
      <div className='banner__details'>
        <h1>{result.title || result.name}</h1>
        <h4>
          {result.overview && result.overview.length > 200
            ? `${result.overview.substring(0, 200)}...`
            : result.overview}
        </h4>
        <button className='banner__details--play'>
          <span>
            <i className='fas fa-play'></i>
          </span>
          Lecture
        </button>
        <button className='banner__details--info'>
          <span>
            <i className='fas fa-info-circle'></i>
          </span>
          Plus d'infos
        </button>
      </div>
      <div className='banner--fade' />
    </div>
  )
}

export default Banner
