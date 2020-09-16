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

      <Row title='Tendances actuelles' url={urls.trending} />
      <Row title='Top 10 en France' url={urls.topRated} />
      <Row title='Programmes originaux' poster url={urls.originals} />
      <Row title='Action' url={urls.action} />
      <Row title='Comédie' url={urls.comedy} />
      <Row title='Romance' url={urls.romance} />
      <Row title='Horreur' url={urls.horror} />
    </div>
  )
}

export default Movies
