import { TEMP_EMAIL, REGISTER_USER, LOAD_USER, USER_ERROR, LOGOUT_USER } from '../types'

const INIT_STATE = {
  token: localStorage.getItem('netflixToken'),
  tempEmail: null,
  isAuthenticated: false,
  loading: true
}

const userReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case TEMP_EMAIL:
      return {
        ...state,
        tempEmail: payload,
        loading: false
      }
    case REGISTER_USER:
      localStorage.setItem('netflixToken', payload.token)
      return {
        ...state,
        token: localStorage.getItem('netflixToken'),
        loading: true
      }
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case LOGOUT_USER:
    case USER_ERROR:
      localStorage.removeItem('netflixToken')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}

export default userReducer
