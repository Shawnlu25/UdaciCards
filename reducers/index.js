import { combineReducers } from 'redux'
import { RECEIVE_DECKS } from '../actions'

function decks (state={}, action) {
  const { decks } = action
  switch (action.type) {
  	case RECEIVE_DECKS : 
  	  return {...state, ...decks}
  	default : 
  	  return state
  }
}

export default combineReducers({decks})