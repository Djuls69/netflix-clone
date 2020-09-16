import React from 'react'
import netflix from '../../assets/netflix.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <img src={netflix} alt='' />
      <h2>
        Développer par{' '}
        <a href='http://www.juliendelusseau.fr' target='_blank' rel='noopener noreferrer'>
          Julien Delusseau
        </a>
      </h2>
      <h3>
        Clone du site{' '}
        <a href='https://www.netflix.com' target='_blank' rel='noopener noreferrer'>
          Netflix
        </a>{' '}
        - Projet personnel à but non lucratif
      </h3>
    </footer>
  )
}

export default Footer
