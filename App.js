import React from 'react'
import { Text, View, StatusBar, Platform } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'

import { white, purple } from './utils/colors'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'

function UdaciCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height : Constants.statusBarHeight }}> 
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator(
  {
    DeckList : {
      screen : DeckList,
      navigationOptions : {
        tabBarLabel : 'Decks'
      }
    },
    NewDeck : {
      screen : NewDeck,
      navigationOptions : {
        tabBarLabel : 'New Deck'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
       height: 56,
       backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex : 1}}>
        <UdaciCardsStatusBar backgroundColor={purple} barStyle="light-content" />
        <Tabs/>
      </View>
    );
  }
}

