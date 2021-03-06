import React from 'react'
import PropTypes from 'prop-types'
import './Register.css'
import { Input, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/userActions'
import { Redirect } from 'react-router-dom'
import Navbar2 from '../../components/navbar2/Navbar2'

const Register = ({ user: { tempEmail }, registerUser, history }) => {
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: values => {
      const errors = {}
      if (!values.password) {
        errors.password = 'Le mot de passe est obligatoire'
      } else if (values.password.length < 6) {
        errors.password = '6 caractères minimum'
      }

      return errors
    },
    onSubmit: values => {
      registerUser({ email: tempEmail, password: values.password })
      history.push('/')
    }
  })

  if (tempEmail === null) {
    return <Redirect to='/' />
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik

  return (
    <div className='register'>
      <Navbar2 />
      <div className='register__content'>
        <h1>S'identifier</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <Input name='email' type='email' value={tempEmail} className='register__input' placeholder='Adresse e-mail' />
          <Input
            name='password'
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className='register__input'
            placeholder='Ajouter un mot de passe'
          />
          <Button className='register__button'>Continuer</Button>
          <div className='register__errors'>{errors.password && touched.password && errors.password}</div>
        </form>
      </div>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

Register.propTypes = {
  user: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

export default connect(mapState, { registerUser })(Register)
