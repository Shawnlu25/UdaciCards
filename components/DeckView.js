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
    const { dispatch } = this.props
    const { deckName } = this.props.navigation.state.params

    getDeck(deckName)
      .then(deck => this.props.deckDataRefresh({[deckName] : deck}))
  }

  render() {
    const { deckName } = this.props.navigation.state.params
  	const { decks } = this.props
    deckData = decks[deckName]
    deckLength = decks[deckName].questions.length
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
  	        length={deckLength} 
  	        size={2}/>
  	    </View>
  	    <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={() => this.props.navigation.navigate('QuizView', {deckData})}>
  	      <Text style={styles.btnText}> Start Quiz </Text>
  	    </TouchableOpacity>
  	    <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={() => this.props.navigation.navigate('NewQuestion', {deckName})}>
  	      <Text style={styles.btnText}> Add New Question </Text>
  	    </TouchableOpacity>
  	  </View>
  	)
  }
}

function mapStateToProps({ decks }) {
  return { 
    decks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deckDataRefresh: deckData => {dispatch(receiveDecks(deckData))}
  }
}

const styles = StyleSheet.create({
  summary : {
  	flex : 5,
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


export default connect(mapStateToProps, mapDispatchToProps)(DeckView) 