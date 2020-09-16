import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { urls } from '../../utils/imdbRoutes'
import Slider from 'react-slick'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import './Row.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Row = ({ title, url, poster }) => {
  const [movies, setMovies] = useState([])
  const [trailer, setTrailer] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(url)
      setMovies(res.data.results)
    }
    fetchMovies()
  }, [url])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    arrows: false,
    adaptiveHeight: true
  }

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  const onReady = event => {
    // access to player in all event handlers via event.target
    event.target.playVideo()
  }

  const handleClick = async movie => {
    try {
      const res = await movieTrailer(movie.name || movie.title || '')
      const id = res.toString().split('=')
      if (trailer === id[1]) {
        setTrailer('')
      } else {
        setTrailer(id[1])
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='movies-row'>
      <h1>{title}</h1>
      <div className='movies-row__container'>
        <Slider {...settings} className='slider'>
          {movies.length > 0 &&
            movies.map(movie => (
              <img
                key={movie.id}
                style={{ width: 230 }}
                onClick={() => handleClick(movie)}
                className='movies-row__poster'
                src={`${urls.image}${poster ? movie.poster_path : movie.backdrop_path}`}
                alt=''
              />
            ))}
        </Slider>
      </div>
      {trailer && <Youtube videoId={trailer} opts={opts} onReady={onReady} />}
    </div>
  )
}

Row.propTypes = {
  title: PropTypes.string.isRequired
}

export default Row
