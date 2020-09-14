import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ user: { user, loading }, component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={props => {
        return !loading && !user ? <Redirect to='/login' /> : <Component {...props} />
      }}
    />
  )
}

const mapState = state => ({
  user: state.user
})

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapState)(PrivateRoute)
