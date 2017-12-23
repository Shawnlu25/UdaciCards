import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'

import DeckSummary from './DeckSummary'
import { white, lightPurp, dimPurp } from '../utils/colors'

class DeckListItem extends Component {
  
  static propTypes = {
    name : PropTypes.string.isRequired,
    length : PropTypes.number.isRequired
  }

  render() {
  	const {name, length} = this.props
  	return (
  	  <View style={styles.listItem}>
  	    <DeckSummary name={name} length={length} size={1}/>
  	  </View>
  	)
  }
}

const styles = StyleSheet.create({
  listItem : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  }
})

export default DeckListItem