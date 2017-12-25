import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'

import { white, darkPurp, purple } from '../utils/colors'

class QuizView extends Component {
  
  static propTypes = {
  }

  render() {
  	return (
  	  <View>
  	    <Text>
          Quiz
        </Text>
  	  </View>
  	)
  }
}

const styles = StyleSheet.create({
  
})

export default QuizView