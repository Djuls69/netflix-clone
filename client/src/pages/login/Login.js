import React from 'react'
import PropTypes from 'prop-types'
import './Login.css'
import { Input, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'

const Login = ({ loginUser }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      const errors = {}
      if (!values.email) {
        errors.email = "L'email est obligatoire"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email non valide'
      }

      if (!values.password) {
        errors.password = 'Le mot de passe est obligatoire'
      } else if (values.password.length < 6) {
        errors.password = '6 caractères minimum'
      }

      return errors
    },
    onSubmit: values => {
      loginUser({ email: values.email, password: values.password })
    }
  })

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik

  return (
    <div className='login'>
      <div className='login__content'>
        <h1>S'identifier</h1>
        <form className='login__form' onSubmit={handleSubmit}>
          <Input
            name='email'
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className='login__input'
            placeholder='Adresse e-mail'
          />
          <Input
            name='password'
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className='login__input'
            placeholder='Mot de passe'
          />
          <Button type='submit' className='login__button'>
            S'identifier
          </Button>
          <div className='login__errors'>{errors.password && touched.password && errors.password}</div>
        </form>
        <p className='login__text'>
          Première visite sur Netflix ?{' '}
          <span>
            {
              <Link to='/' className='login__link'>
                Inscrivez-vous
              </Link>
            }
          </span>
        </p>
        <p className='login__small'>
          Cette page est protégée par Google reCAPTCHA pour nous assurer que vous n'êtes pas un robot.
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser })(Login)
