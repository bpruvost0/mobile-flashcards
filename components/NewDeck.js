import React, { Component } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions/decks'
import { dark, white, accent, text } from '../utils/colors'

class NewDeck extends Component {
  state = {
    title: '',
  }

  handleTextChange = (title) => {
    this.setState(() => ({
      title,
    }))
  }

  handleSubmit = () => {
    const { title } = this.state
    const titleToPass = title
    const { dispatch, navigation } = this.props

    dispatch(addDeck(title))

    this.setState(() => ({ title: '' })) 

    navigation.navigate(
      'Deck',
      {
        title: titleToPass,
      }
    )
  }

  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1, 
          alignItems: 'center', 
          height: '100%'
        }}
      >
        <View style={styles.mainView}>
          <Text style={[styles.headerText]}>Provide a Title for this Deck</Text>
          <TextInput
            style={styles.input}
            placeholder="Deck Title"
            value={title}
            onChangeText={this.handleTextChange}
          />
          <TouchableOpacity
            disabled={title === ''}
            onPress={this.handleSubmit}
            style={[styles.button]}
          >
              <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  } 
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    width: '100%',  paddingTop: '20%'
  },
  headerText: {
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: accent,
    marginTop: 10,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderColor: dark,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  input: {
    width: '80%',
    color: text,
    margin: 30,
    paddingLeft: 10,
    borderColor: dark,
    borderWidth: 2,
    borderRadius: 10,
  }
})

export default connect()(NewDeck)
