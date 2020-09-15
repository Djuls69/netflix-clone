import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from 'axios'

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
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),url(${imagePath}${result.backdrop_path})
        no-repeat center center/cover`
      }}
    ></div>
  )
}

export default Banner
