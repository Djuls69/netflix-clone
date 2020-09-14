import React from 'react'
import PropTypes from 'prop-types'

const ProfilesItem = ({ name, avatar }) => {
  return (
    <div className='profiles__block'>
      <div className='profiles__avatar'>
        <img src={avatar} alt={`${name}'s avatar`} />
      </div>
      <h2>{name}</h2>
    </div>
  )
}

ProfilesItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

export default ProfilesItem
