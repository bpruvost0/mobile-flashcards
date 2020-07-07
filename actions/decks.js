export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard (title, question, answer) {
  return {
    type: ADD_CARD,
    title,
    question,
    answer
  }
}

function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

const initialData = {
  React: {
    title: 'Trees and graphs',
    questions: [
      {
        question: 'What\'s a binary tree',
        answer: 'A binary tree is a special tree, where you can have at most two children. This means, one node can either no child, one child, or two children. They cannot have three children or more.'
      }
    ]
  },
  JavaScript: {
    title: 'Data structures',
    questions: [
      {
        question: 'What is a Linked List?',
        answer: 'A linked list is a linear data structure (like arrays) where each element is a separate object. Each element (that is node) of a list is comprising of two items – the data and a reference to the next node.'
      },
      {
        question: 'What is a Queue?',
        answer: 'Queue is a linear structure which follows the order is First In First Out (FIFO) to access elements. Mainly the following are basic operations on queue: Enqueue, Dequeue, Front, Rear.'
      }
    ]
  }
}

export function handleInitialData (data) {
  return (dispatch) => {
    return dispatch(receiveDecks(data === null ? initialData : data['decks']))
  }
}
