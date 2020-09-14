import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './Profiles.css'
import ProfilesItem from '../../components/profilesItem/ProfilesItem'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Profiles = ({ user: { loading, user }, history }) => {
  if (!loading && !user) {
    return <Redirect to='/login' />
  }

  return (
    <div className='profiles'>
      <div className='profiles__container'>
        {user ? (
          <Fragment>
            <h1>Qui est-ce ?</h1>
            <div className='profiles__blocks'>
              {!loading &&
                user.profils.length > 0 &&
                user.profils.map((profile, idx) => (
                  <ProfilesItem key={idx} avatar={profile.avatar} name={profile.name} />
                ))}
              <div onClick={() => history.push('/add-profile')} className='profiles__block'>
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
  user: PropTypes.object.isRequired
}

export default connect(mapState)(Profiles)
