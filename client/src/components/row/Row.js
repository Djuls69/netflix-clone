import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { urls } from '../../utils/imdbRoutes'
import Slider from 'react-slick'
import './Row.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Row = ({ title, url, poster }) => {
  const [movies, setMovies] = useState([])

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
                className='movies-row__poster'
                src={`${urls.image}${poster ? movie.poster_path : movie.backdrop_path}`}
                alt=''
              />
            ))}
        </Slider>
      </div>
    </div>
  )
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.bool.isRequired
}

export default Row
