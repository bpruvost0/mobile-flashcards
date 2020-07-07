import React from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { dark, light, secondaryText } from '../utils/colors'
import { useNavigation } from '@react-navigation/native' 

function DeckCard (props) {  
  
	const { title, num } = props
  const navigation = useNavigation()

  return (
    <View style={styles.mainView}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => navigation.navigate(
          'Deck',
          {
            title: title,
          }
        )}
      >
        <View style={styles.item}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={{color: secondaryText,}}>{num === 1 ? `${num} card` : `${num} cards`}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%', 
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: '60%',
    backgroundColor: light,
    borderColor: dark,
    borderWidth: 2,
    padding: 20,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  headerText: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps ({ decks }, { title }) {
  const deck = decks[title]

  return {
    title: deck.title,    
    num: deck.questions.length,
  }
}


export default connect(mapStateToProps)(DeckCard)
