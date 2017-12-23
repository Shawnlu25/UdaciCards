import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'

import { white, darkPurp, purple } from '../utils/colors'

class DeckSummary extends Component {
  
  static propTypes = {
    name : PropTypes.string.isRequired,
    length : PropTypes.number.isRequired,
    size : PropTypes.number.isRequired
  }

  render() {
  	const { name, length, size } = this.props
  	return (
  	  <View style={styles.summary}>
  	    <Text style={{fontSize : 20 * size, color: darkPurp, fontWeight : 'bold'}}>
         {name}
        </Text>
  	    <Text style={{fontSize : 14 * size, color: purple}}>
          {length} {length === 1 ? 'card' : 'cards'}
        </Text>
  	  </View>
  	)
  }
}

const styles = StyleSheet.create({
  summary : {
    flex: 1,
  	flexDirection : 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default DeckSummary