import React from 'react'
import PropTypes from 'prop-types'
import './AddProfile.css'
import CustomButton from '../../components/customButton/CustomButton'

const AddProfile = ({ history }) => {
  return (
    <div className='add-profile'>
      <div className='add-profile__container'>
        <h1>Ajouter un profil</h1>
        <h2>Ajoutez un profil pour un nouvel utilisateur Netflix.</h2>
        <div className='add-profile__form'>
          <div className='add-profile__avatar'>
            <img
              src='https://occ-0-56-55.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABSz8U4uC6_i0Fuc-oUrLQ-6_4cN4K_0kkS76utZWTEfAAFwG6TB09D0nSC1NqqtCJfckNvLVMajXBYjOSGc7zZi0Dx7z.png?r=b97'
              alt=''
            />
          </div>
          <input type='text' name='text' placeholder='Nom' />
        </div>
        <div className='add-profile__buttons'>
          <CustomButton type='submit' text='continuer' />
          <CustomButton onClick={() => history.push('/profiles')} secondary text='annuler' />
        </div>
      </div>
    </div>
  )
}

AddProfile.propTypes = {}

export default AddProfile
