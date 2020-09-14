import axios from 'axios'
import { REGISTER_USER, TEMP_EMAIL, LOAD_USER, USER_ERROR, LOGOUT_USER } from '../types'

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
    alert('Register successfull')
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: USER_ERROR
    })
  }
}

export const loginUser = formData => async dispatch => {
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
    alert('Register successfull')
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: USER_ERROR
    })
  }
}

export const loadUser = () => async dispatch => {
  if (localStorage.netflixToken) {
    axios.defaults.headers.common['Authorization'] = localStorage.netflixToken
  } else {
    delete axios.defaults.headers.common
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

export const logoutUser = () => ({
  type: LOGOUT_USER
})
