import axios from 'axios'
import { REGISTER_USER, TEMP_EMAIL, LOAD_USER, USER_ERROR, LOGOUT_USER, ADD_PROFILE, SELECT_PROFILE } from '../types'
import { setError } from './errorsActions'

export const getTempEmail = payload => {
  return {
    type: TEMP_EMAIL,
    payload
  }
}

export const registerUser = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/users', formData, config)
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: USER_ERROR
    })
  }
}

export const loginUser = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/users/login', formData, config)
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    })
    dispatch(loadUser())
    history.push('/')
  } catch (err) {
    dispatch(setError(err.response.data))
    dispatch({
      type: USER_ERROR
    })
  }
}

export const loadUser = () => async dispatch => {
  if (localStorage.netflixToken) {
    axios.defaults.headers.common['Authorization'] = localStorage.netflixToken
  } else {
    delete axios.defaults.headers.common['Authorization']
  }

  try {
    const res = await axios.get('/api/users')
    dispatch({
      type: LOAD_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: USER_ERROR
    })
  }
}

export const logoutUser = history => dispatch => {
  dispatch({
    type: LOGOUT_USER
  })
  history.push('/')
}

export const addProfile = formData => async dispatch => {
  try {
    const res = await axios.post('/api/users/profile', formData, { headers: { 'Config-Type': 'application/json' } })
    dispatch({
      type: ADD_PROFILE,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: USER_ERROR
    })
  }
}

export const selectProfile = profile => dispatch => {
  dispatch({
    type: SELECT_PROFILE,
    payload: profile
  })
}
