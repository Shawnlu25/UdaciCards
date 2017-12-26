import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = "@UdaciCards:decks"

function setDummyData() {
  console.log('Create Dummy Data')
  return {
    React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => JSON.parse(result))
}

export function getDeck(name) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => JSON.parse(result))
    .then((result) => result[name])
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[title] : {title : title, questions : []}}))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => JSON.parse(result))
    .then((result) => {result[title].questions.push(card); return result;})
    .then((result) => AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(result)))
}
