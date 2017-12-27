import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { white, darkPurp, purple, dimPurp } from '../utils/colors'
import { clearLocalNotification, setLocalNotification} from '../utils/notification'

class QuizView extends Component {
  
  state = {
    cursor : 0,
    numCorrect : 0,
    showAnswer : false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title : "Quiz"
    }
  }
  
  reset = () => {
    this.setState({cursor : 0, showAnswer : false, numCorrect : 0})
  }

  incrementCursor = () => {
    const curCursor = this.state.cursor
    this.setState({cursor : curCursor + 1, showAnswer : false})
  }

  incrementCorrect = () => {
    const curCorrect = this.state.numCorrect
    this.setState({numCorrect : curCorrect + 1})
  }
  
  flipAnswer = () => {
    const showAnswer = this.state.showAnswer
    this.setState({showAnswer : !showAnswer})
  }

  render() {
    const { questions } = this.props.deckData

    if ( questions.length == 0 ) {
      return (
        <View style={styles.contentView}>
          <Text style={styles.contentStrSmall}>No Questions in this Deck</Text>
        </View>
      )
    }

    if ( this.state.cursor == questions.length) {
      clearLocalNotification()
      setLocalNotification()
      return (
        <View style={{
          backgroundColor:white, 
          flex : 1, 
          alignItems: 'stretch',
          justifyContent: 'space-between'}}>
        <View style={styles.contentView}>
          <Text style={styles.contentStrSmall}>You scored {this.state.numCorrect} out of {questions.length}</Text>
        </View>
        <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={()=>this.reset()}>
          <Text style={styles.btnText}> Restart Quiz </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={()=>this.props.navigation.goBack()}>
          <Text style={styles.btnText}> Back to Deck </Text>
        </TouchableOpacity>
        </View>
      )
    }

  	return (
  	  <View style={{
          backgroundColor:white, 
          flex : 1, 
          alignItems: 'stretch',
          justifyContent: 'space-between'}}>
        <Text style={styles.index}>
          {this.state.cursor + 1} / {questions.length}
        </Text>

        {!this.state.showAnswer &&
        <View style={styles.contentView}>
          <Text style={styles.contentStr}>
            {questions[this.state.cursor]['question']}
          </Text>
        </View>}
        {!this.state.showAnswer &&
        <TouchableOpacity
            style={styles.flipBtn} 
            underlayColor={purple}
            onPress={() => this.flipAnswer()}>
          <Text style={styles.flipBtnText}> Answer </Text>
        </TouchableOpacity>}

        {this.state.showAnswer &&
        <View style={styles.contentView}>
          <Text style={styles.contentStr}>
            {questions[this.state.cursor]['answer']}
          </Text>
        </View>}
        {this.state.showAnswer &&
        <TouchableOpacity 
          style = {styles.flipBtn}
          underlayColor={purple}
          onPress={() => this.flipAnswer()}>
          <Text style={styles.flipBtnText}> Question </Text>
        </TouchableOpacity>
        }

        <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={() => {this.incrementCursor();this.incrementCorrect()}}>
          <Text style={styles.btnText}> Correct </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.btn} 
          underlayColor={purple}
          onPress={() => this.incrementCursor()}>
          <Text style={styles.btnText}> Incorrect </Text>
        </TouchableOpacity>
  	  </View>
  	)
  }
}

const styles = StyleSheet.create({
  index : {
    fontSize : 20, 
    color: purple, 
    fontWeight : 'bold'
  },
  flipBtn : {
    flex : 1,
    borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'column',
    marginBottom : 50,
  },
  flipBtnText : {
    color : purple,
    fontSize : 20,
    fontWeight : 'bold'
  },
  contentStr : {
    fontSize : 38,
    color: darkPurp,
    fontWeight : 'bold',
    textAlign: 'center'
  },
  contentStrSmall : {
    fontSize : 24,
    color: darkPurp,
    fontWeight : 'bold',
  },
  contentView : {
    flex : 4, 
    justifyContent : 'center',
    alignItems : 'center'
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

function mapStateToProps(state, { navigation }) {
  const { deckData } = navigation.state.params
  return { 
    deckData
  }
}

export default connect(mapStateToProps)(QuizView)