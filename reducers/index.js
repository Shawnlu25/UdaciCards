import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state={}, action) {
  const { decks, deckName, card } = action
  switch (action.type) {
  	case RECEIVE_DECKS : 
  	  return {...state, ...decks}
  	case ADD_DECK : 
  	  return {...state, [deckName] : { title : deckName, questions: []}}
  	case ADD_CARD : 
      var deck = state[deckName]
      deck.questions.push(card)
      console.log(card)
      return {...state, [deckName] : deck}
  	default : 
  	  return state
  }
}

export default combineReducers({decks})