import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Navbar.css'
import netflixLogo from '../../assets/netflix.png'
import { Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'

const Navbar = ({ location, user: { isAuthenticated, loading }, logoutUser, history }) => {
  const [option2, setOption2] = useState(false)
  useEffect(() => {
    if (location.pathname === '/register') {
      setOption2(true)
    } else {
      setOption2(false)
    }
  }, [location.pathname])

  return (
    <Fragment>
      <div className={`navbar ${option2 && 'option2'}`}>
        <Link to='/' className='navbar__logo'>
          <img src={netflixLogo} alt='Netflix Logo' />
        </Link>
        {!loading && isAuthenticated ? (
          <Button as={Link} to='/' onClick={() => logoutUser(history)}>
            Se Déconnecter
          </Button>
        ) : (
          <Button as={Link} to='/login'>
            S'identifier
          </Button>
        )}
      </div>
    </Fragment>
  )
}

const mapState = state => ({
  user: state.user
})

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default connect(mapState, { logoutUser })(withRouter(Navbar))
