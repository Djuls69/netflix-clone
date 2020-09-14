import React from 'react'
import PropTypes from 'prop-types'
import './Profiles.css'
import ProfilesItem from '../../components/profilesItem/ProfilesItem'
import { connect } from 'react-redux'

const Profiles = ({ user: { loading, user } }) => {
  return (
    <div className='profiles'>
      <div className='profiles__container'>
        <h1>Qui est-ce ?</h1>
        <div className='profiles__blocks'>
          {!loading &&
            user.profils.length > 0 &&
            user.profils.map((profile, idx) => <ProfilesItem key={idx} avatar={profile.avatar} name={profile.name} />)}
          <div className='profiles__block'>
            <div className='profiles__avatar'>
              <i className='fas fa-plus-circle'></i>
            </div>
            <h2>Ajouter un profil</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ user }) => ({ user })

Profiles.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapState)(Profiles)
