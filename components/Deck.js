import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { dark, white, accent, text, secondaryText } from '../utils/colors'

function Deck (props) {
  let setNewNotification = () => {
    clearLocalNotification()
      .then(setLocalNotification)
  }
    const { title, num } = props
    const navigation = useNavigation()
    return (
      <View style={styles.mainView}>
        <View style={styles.innerView}>
          <Text style={[styles.headerText]}>{title}</Text>
          <Text style={{color: secondaryText,}}>{num === 1 ? `${num} card` : `${num} cards`}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.lightButton]}
          onPress={() => navigation.navigate(
            'NewCard',
            {
              title,
            }
          )}
        >
            <Text style={{fontSize: 20, color: text}}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.darkButton]}
          onPress={() => {
              navigation.navigate(
                'Quiz',
                {
                  title,
                }
              )
              setNewNotification()
            }
          }
        >
            <Text style={{fontSize: 20, color: white}}>Take Quiz</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1, 
    alignItems: 'center',
  },
  innerView: {
    height: '65%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerText: {
    fontSize: 45,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
  },
  lightButton: {
    backgroundColor: white
  },
  darkButton: {
    backgroundColor: accent
  },
  button: {    
    marginTop: 10,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderColor: dark,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
  },
})

function mapStateToProps ({ decks }, { route }) {
  const { title } = route.params
  const deck = decks[title]

  return {
    title: deck.title,
    num: deck.questions.length,
  }
}

export default connect(mapStateToProps)(Deck)
