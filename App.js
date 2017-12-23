import React from 'react'
import { Text, View, StatusBar, Platform, AsyncStorage } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { white, purple } from './utils/colors'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import NewDeck from './components/NewDeck'
import reducer from './reducers'

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

const MainNavigator = StackNavigator({
  Home : {
    screen: Tabs
  },
  DeckView : {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <View style={{flex : 1}}>
          <UdaciCardsStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

