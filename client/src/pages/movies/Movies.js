import React from 'react'
import Banner from '../../components/banner/Banner'
import Row from '../../components/row/Row'
import { urls } from '../../utils/imdbRoutes'
import './Movies.css'

const Movies = props => {
  return (
    <div className='movies'>
      {/* Navbar3 */}

      <Banner />

      <Row title='Trending' url={urls.trending} />
      <Row title='Top Rated' url={urls.topRated} />
      <Row title='Originals' poster url={urls.originals} />
      <Row title='Action' url={urls.action} />
      <Row title='Comedy' url={urls.comedy} />
      <Row title='Romance' url={urls.romance} />
      <Row title='Horror' url={urls.horror} />
    </div>
  )
}

export default Movies
