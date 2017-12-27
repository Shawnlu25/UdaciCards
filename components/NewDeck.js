import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { saveDeckTitle, getDecks } from '../utils/api'
import { addDeck, receiveDecks } from '../actions'
import { white, dimPurp, darkPurp, purple } from '../utils/colors'

class NewDeck extends Component {
  state = {
  	deckNameInput : ""
  }
  
  deckInputChange = (input) => {
    this.setState({deckNameInput : input})
  }  

  submitNewDeck = () => {
    const deckName = this.state.deckNameInput
    saveDeckTitle(deckName)
    this.props.dispatch(addDeck(deckName))
    this.props.navigation.navigate('DeckView', {deckName})
    this.setState({deckNameInput : ''})
  }

  render() {
    const { deckNameInput } = this.state
  	return (
  	  <KeyboardAvoidingView 
  	    style={{backgroundColor:white, flex : 1, justifyContent : 'center', alignItems : 'stretch'}}
  	    behavior='padding'>
  	    <View style={{flex : 6, justifyContent : 'center', alignItems : 'stretch'}}>
  	      <Text style={styles.titleStr}>What is the title?</Text>
  	      <TextInput 
  	        style={styles.textInput}
  	        value={deckNameInput}
  	        onChangeText={this.deckInputChange}/>
  	    </View>
  	    <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={() => this.submitNewDeck()}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
  	  </KeyboardAvoidingView>
  	)
  }
}

function mapStateToProps(state) {
  return {}
}

const styles = StyleSheet.create({
  titleStr : {
    fontSize : 38,
    color: darkPurp,
    fontWeight : 'bold',
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : 20,
    textAlign: 'center'
  },
  textInput : {
  	fontSize : 24,
  	color: purple,
  	textAlign: 'center',
  	marginLeft : 24,
  	marginRight : 24
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

export default connect(mapStateToProps)(NewDeck)