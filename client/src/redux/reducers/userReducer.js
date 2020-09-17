import { TEMP_EMAIL, REGISTER_USER, LOAD_USER, USER_ERROR, LOGOUT_USER, ADD_PROFILE, SELECT_PROFILE } from '../types'

const INIT_STATE = {
  token: localStorage.getItem('netflixToken'),
  tempEmail: null,
  isAuthenticated: false,
  user: null,
  selectedProfile: JSON.parse(localStorage.getItem('netflixProfile')),
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
        loading: false
      }
    case LOAD_USER:
    case ADD_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      }
    case LOGOUT_USER:
    case USER_ERROR:
      localStorage.removeItem('netflixToken')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        selectedProfile: null,
        loading: false
      }
    case SELECT_PROFILE:
      localStorage.setItem('netflixProfile', JSON.stringify(payload))
      return {
        ...state,
        selectedProfile: JSON.parse(localStorage.getItem('netflixProfile')),
        loading: false
      }
    default:
      return state
  }
}

export default userReducer
