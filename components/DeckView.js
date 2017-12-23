import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { white, dimPurp, purple } from '../utils/colors'
import { getDeck } from '../utils/api'
import { receiveDecks } from '../actions'
import DeckSummary from './DeckSummary'

class DeckView extends Component {
  
  static navigationOptions = ({ navigation }) => {
  	const { deckName } = navigation.state.params
  	return {
  	  title : deckName
  	}
  }

  componentDidMount() {
    const { dispatch, deckName } = this.props

    getDeck(deckName)
      .then(deck => dispatch(receiveDecks({[deckName] : deck})))
  }

  render() {
  	const { deckName, deckData } = this.props
  	return (
  	  <View 
  	    style={{
  	      backgroundColor:white, 
  	      flex : 1, 
  	      alignItems: 'stretch',
  	      justifyContent: 'space-between'}}>
  	    <View style={styles.summary}>
  	      <DeckSummary 
  	        name={deckName} 
  	        length={deckData.questions.length} 
  	        size={2}/>
  	    </View>
  	    <TouchableOpacity style={styles.btn} underlayColor={purple}>
  	      <Text style={styles.btnText}> Start Quiz </Text>
  	    </TouchableOpacity>
  	    <TouchableOpacity style={styles.btn} underlayColor={purple}>
  	      <Text style={styles.btnText}> Add New Question </Text>
  	    </TouchableOpacity>
  	  </View>
  	)
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params
  return { 
  	deckName,
  	deckData : state.decks[deckName]
  }
}

const styles = StyleSheet.create({
  summary : {
  	flex : 3,
    padding: 10
  },
  btn : {
  	backgroundColor : dimPurp,
  	flex : 1,
  	borderRadius : 5,
  	alignItems : 'center',
  	justifyContent : 'center',
    marginBottom : 10,
    marginLeft : 10,
    marginRight : 10,
    flexDirection : 'column'
  },
  btnText : {
  	color : white,
  	fontSize : 25,
  	fontWeight : 'bold'
  }
})


export default connect(mapStateToProps)(DeckView) 