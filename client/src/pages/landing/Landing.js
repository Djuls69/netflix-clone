import React from 'react'
import './Landing.css'
import { Input, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'

const Landing = () => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate: values => {
      const errors = {}
      if (!values.email) {
        errors.email = "L'email est obligatoire"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email non valide'
      }
      return errors
    },
    onSubmit: values => {
      console.log(values.email)
    }
  })

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik

  return (
    <div className='landing'>
      <div className='landing__content'>
        <h1>
          Divertissement garanti.
          <br />
          0,99 € pendant vos
          <br />
          30 premiers jours.
          <br />
        </h1>
        <h4>Où que vous soyez. Annulez à tout moment.</h4>
        <p>Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.</p>
        <form className='landing__form' onSubmit={handleSubmit}>
          <div className='landing__input'>
            <Input
              name='email'
              type='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder='Adresse e-mail'
            />
            <Button>Essayez pour 0,99 €</Button>
          </div>
          <div className='landing__errors'>{errors.email && touched.email && errors.email}</div>
        </form>
        <p>Seuls les nouveaux utilisateurs sont admissibles à cette offre.</p>
      </div>
    </div>
  )
}

export default Landing
