import React from 'react'
import './Navbar.css'
import netflixLogo from '../../assets/netflix.png'
import { Button } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={netflixLogo} alt='Netflix Logo' />
      <Button>S'identifier</Button>
    </div>
  )
}

export default Navbar
