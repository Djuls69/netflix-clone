import { SET_ERROR } from '../types'

const INIT_STATE = null

const errorsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    default:
      return state
  }
}

export default errorsReducer
