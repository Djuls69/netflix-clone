import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './AddProfile.css'
import CustomButton from '../../components/customButton/CustomButton'
import { connect } from 'react-redux'
import { addProfile } from '../../redux/actions/userActions'
import Navbar from '../../components/navbar/Navbar'

const AddProfile = ({ history, addProfile, user: { user } }) => {
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    addProfile({ name })
    history.push('/profiles')
  }

  return (
    <div className='add-profile'>
      <Navbar />
      <div className='add-profile__container'>
        <form noValidate onSubmit={handleSubmit}>
          <h1>Ajouter un profil</h1>
          <h2>Ajoutez un profil pour un nouvel utilisateur Netflix.</h2>
          <div className='add-profile__form'>
            <div className='add-profile__avatar'>
              <img
                src={
                  user && user.profiles.length === 0
                    ? 'https://occ-0-56-55.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABSLII-o6GmYPFo09Nlv7D5jVLJGKsBJnZFzFAj82yk-WfGl7mV_vbCPIK5h65iTgGTs1dobHjU5Nlwc0EwKaty5KYhoV.png'
                    : 'https://occ-0-56-55.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABYCq-HPaBmwWzyEo8UjC3jQ7a2mKJhU4uPbQwFrauKbu9_-6GpfPccnQh3UWZvsGLQ1MwLo_4YZ-kuTiAsqpq0oEdPXS.png'
                }
                alt=''
              />
            </div>
            <input type='text' name='name' placeholder='Nom' value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className='add-profile__buttons'>
            <CustomButton type='submit' text='continuer' />
            <CustomButton onClick={() => history.push('/profiles')} secondary text='annuler' />
          </div>
        </form>
      </div>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

AddProfile.propTypes = {
  addProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapState, { addProfile })(AddProfile)
