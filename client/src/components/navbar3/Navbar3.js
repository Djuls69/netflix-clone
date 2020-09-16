import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Navbar3.css'
import netflixLogo from '../../assets/netflix.png'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectProfile, logoutUser } from '../../redux/actions/userActions'

const Navbar3 = ({ user: { user, selectedProfile }, selectProfile, logoutUser, history }) => {
  const [popup, setPopup] = useState(false)
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 150) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    })
  }, [])

  if (selectedProfile === null) {
    return <Redirect to='/' />
  }

  return (
    <Fragment>
      <div className='navbar3' style={{ backgroundColor: scroll && 'rgba(0,0,0,0.8)' }}>
        <div className='navbar3--left'>
          <Link to='/' className='navbar3__logo'>
            <img src={netflixLogo} alt='Netflix Logo' />
          </Link>
          <ul>
            <li>Accueil</li>
            <li>Séries</li>
            <li>Films</li>
            <li>Nouveautés</li>
            <li>Ma liste</li>
          </ul>
        </div>
        <div onMouseEnter={() => setPopup(!popup)} className='navbar3__user'>
          <h4>{selectedProfile.name}</h4>
          <img src={selectedProfile.avatar} alt='' />
        </div>
        {popup && (
          <div onMouseLeave={() => setPopup(false)} className='navbar3__popup'>
            <ul>
              {user &&
                user.profiles
                  .filter(profile => profile._id !== selectedProfile._id)
                  .map(profile => (
                    <li
                      key={profile._id}
                      onClick={() => {
                        selectProfile(profile)
                        setPopup(false)
                      }}
                      className='navbar3__popup--user'
                    >
                      <h4>{profile.name}</h4>
                      <img src={profile.avatar} alt='' />
                    </li>
                  ))}
              <li onClick={() => history.push('/profiles')}>Gérer les utilisateurs</li>
              <li onClick={() => logoutUser(history)}>Se déconnecter</li>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  )
}

const mapState = state => ({
  user: state.user
})

Navbar3.propTypes = {
  user: PropTypes.object.isRequired,
  selectProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default connect(mapState, { selectProfile, logoutUser })(withRouter(Navbar3))
