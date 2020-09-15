import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Profiles.css'
import ProfilesItem from '../../components/profilesItem/ProfilesItem'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectProfile } from '../../redux/actions/userActions'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'

const Profiles = ({ user: { loading, user }, history, selectProfile }) => {
  useEffect(() => {
    const testFetch = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/trending/all/week?api_key=0bde9bd901964f55023e7ae1b2d901bd'
        )
        console.log(res.data.results)
      } catch (err) {
        console.log(err.message)
      }
    }
    testFetch()
  }, [])

  if (!loading && !user) {
    return <Redirect to='/login' />
  }

  const handleClick = () => {
    if (user.profiles.length < 2) {
      return history.push('/add-profile')
    }
    return
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
                    onClick={() => selectProfile(profile)}
                    key={profile._id}
                    avatar={profile.avatar}
                    name={profile.name}
                  />
                ))}
              <div onClick={handleClick} className='profiles__block'>
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
