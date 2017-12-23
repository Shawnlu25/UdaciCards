import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import { getDecks } from '../utils/api'
import { white, dimPurp } from '../utils/colors'
import { receiveDecks } from '../actions'
import DeckListItem from './DeckListItem'

class DeckList extends Component {
  
  state = {
  	ready : false
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready : true})))
  }

  render() {
  	const { decks } = this.props
  	const { ready } = this.state

  	if (ready === false)
  		return <AppLoading/>

  	return (
  	  <View style={{backgroundColor:dimPurp, flex : 1}}>
  	    {Object.keys(decks.decks).map((deckName) => {
  	      return (
  	      <TouchableOpacity 
  	       key={deckName}
  	       onPress={() => this.props.navigation.navigate('DeckView', {deckName})}>
  	        <DeckListItem name={deckName} length={decks.decks[deckName].questions.length}/>
  	      </TouchableOpacity>
  	      )
  	    }
  	    )}
  	  </View>
  	)
  }
}

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(DeckList) 