import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { addCardToDeck, getDeck } from '../utils/api'
import { receiveDecks, addCard } from '../actions'
import { white, dimPurp, darkPurp, purple } from '../utils/colors'

class NewQuestion extends Component {
  state = {
  	questionInput : "",
  	answerInput : ""
  }
  
  static navigationOptions = ({ navigation }) => {
  	const { deckName } = navigation.state.params
  	return {
  	  title : 'New Question'
  	}
  }

  questionInputChange = (input) => {
    this.setState({questionInput : input})
  }  

  answerInputChange = (input) => {
    this.setState({answerInput : input})
  }  

  submitNewQuestion = () => {
    addCardToDeck(this.props.deckName, {question : this.state.questionInput, answer : this.state.answerInput})
    .then(results => {
      this.props.dispatch(addCard(this.props.deckName, {question : this.state.questionInput, answer : this.state.answerInput}))
      this.props.navigation.goBack()
    })
    this.setState({questionInput:'', answerInput :''})
  }

  render() {
    const { questionInput, answerInput } = this.state
    const { deckName } = this.props
  	return (
  	  <KeyboardAvoidingView 
  	    style={{backgroundColor:white, flex : 1, justifyContent : 'center', alignItems : 'stretch'}}
  	    behavior='padding'>
  	    <View style={{flex : 3, justifyContent : 'center', alignItems : 'stretch'}}>
  	      <Text style={styles.titleStr}>What is the question?</Text>
  	      <TextInput 
  	        style={styles.textInput}
  	        value={questionInput}
  	        onChangeText={this.questionInputChange}/>
  	    </View>
  	    <View style={{flex : 3, justifyContent : 'center', alignItems : 'stretch'}}>
  	      <Text style={styles.titleStr}>What is the answer?</Text>
  	      <TextInput 
  	        style={styles.textInput}
  	        value={answerInput}
  	        onChangeText={this.answerInputChange}/>
  	    </View>
  	    <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={() => {this.submitNewQuestion()}}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
  	  </KeyboardAvoidingView>
  	)
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params
  return { 
  	deckName
  }
}

const styles = StyleSheet.create({
  titleStr : {
    fontSize : 30,
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

export default connect(mapStateToProps)(NewQuestion)