import React, { Component } from "react"
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import DeckCard from './DeckCard'
import { setLocalNotification } from '../utils/helpers'


class DeckList extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    
    const { deckIds } = this.props
  
    return (
      <View style={{width: '100%', alignItems: 'center',}}>
        <FlatList
          style={{width: '100%',}}
          data={deckIds}
          renderItem={({ item }) => <DeckCard title={item} />}
          keyExtractor={item => item}
        />
      </View>
    )
  } 
}


function mapStateToProps ({ decks }) {
  const deckIds = Object.keys(decks)

  return {
    deckIds,
  }
}

export default connect(mapStateToProps)(DeckList)
