import { combineReducers } from 'redux'
import user from './userReducer'
import errors from './errorsReducers'

const allReducers = combineReducers({ user, errors })

export default allReducers
