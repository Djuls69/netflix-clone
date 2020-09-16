import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './Profiles.css'
import ProfilesItem from '../../components/profilesItem/ProfilesItem'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectProfile } from '../../redux/actions/userActions'
import Navbar from '../../components/navbar/Navbar'

const Profiles = ({ user: { loading, user }, history, selectProfile }) => {
  if (!loading && !user) {
    return <Redirect to='/login' />
  }

  const addProfile = () => {
    if (user.profiles.length < 2) {
      return history.push('/add-profile')
    }
    return
  }

  const handleClick = profile => {
    selectProfile(profile)
    history.push('/movies')
  }

  return (
    <div className='profiles'>
      <Navbar />
      <div className='profiles__container'>
        {user ? (
          <Fragment>
            <h1>Qui est-ce ?</h1>
            <div className='profiles__blocks'>
              {!loading &&
                user.profiles.length > 0 &&
                user.profiles.map(profile => (
                  <ProfilesItem
                    onClick={() => handleClick(profile)}
                    key={profile._id}
                    avatar={profile.avatar}
                    name={profile.name}
                  />
                ))}
              <div onClick={addProfile} className='profiles__block'>
                <div className='profiles__avatar'>
                  <i className='fas fa-plus-circle'></i>
                </div>
                <h2>Ajouter un profil</h2>
              </div>
            </div>
          </Fragment>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    </div>
  )
}

const mapState = ({ user }) => ({ user })

Profiles.propTypes = {
  user: PropTypes.object.isRequired,
  selectProfile: PropTypes.func.isRequired
}

export default connect(mapState, { selectProfile })(Profiles)
