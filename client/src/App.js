import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { connect } from 'react-redux'
import { loadUser } from './redux/actions/userActions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profiles from './pages/profiles/Profiles'
import PrivateRoute from './utils/PrivateRoute'
import AddProfile from './pages/addProfile/AddProfile'

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/profiles' component={Profiles} />
          <PrivateRoute exact path='/add-profile' component={AddProfile} />
        </Switch>
      </Router>
    </div>
  )
}

Register.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(App)
