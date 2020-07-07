import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { dark, white, accent, text } from '../utils/colors'

function Score (props) {
  const { score, answered, resetQuiz, title } = props
  const navigation = useNavigation()

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{height: '50%', justifyContent: 'center', alignItems: 'center'}}>
        <Text>You have completed this Quiz</Text>
        <Text style={[styles.headerText]}>{`${score} / ${answered}`}</Text>
      </View>
      <TouchableOpacity
        onPress={resetQuiz}
        style={[styles.button, styles.darkButton]}
      >
          <Text style={{color: white }}>Take this Quiz again</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(
          'Deck',
          {
            title: title,
          }
        )}
        style={[styles.button, styles.lightButton]}
      >
          <Text style={{color: text}}>Back To Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    color: dark,
    fontSize: 50,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  lightButton: {
    backgroundColor: white
  },
  darkButton: {
    backgroundColor: accent
  },
  button: {    
    borderColor: dark,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    width:'60%',
    marginTop: 10,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,    
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
  },
})

export default Score
