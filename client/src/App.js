import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadUser } from './redux/actions/userActions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Profiles from './pages/profiles/Profiles'
import PrivateRoute from './utils/PrivateRoute'
import AddProfile from './pages/addProfile/AddProfile'
import Movies from './pages/movies/Movies'
import Footer from './components/footer/Footer'

if (localStorage.netflixToken) {
  axios.defaults.headers.common['Authorization'] = localStorage.netflixToken
} else {
  delete axios.defaults.headers.common['Authorization']
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/add-profile' component={AddProfile} />
        <PrivateRoute exact path='/movies' component={Movies} />
      </Switch>
      <Footer />
    </Router>
  )
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(App)
