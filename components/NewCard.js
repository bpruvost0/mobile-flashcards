import React, { Component } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/decks'
import { dark, white, accent, text } from '../utils/colors'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleChange = (name, text) => {
    this.setState({[name]: text});
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const { title } = this.props.route.params

    this.props.dispatch(addCard(title, question, answer))

    this.setState(() => ({ question: '', answer: '' })) 
  }

  render() {
    
    const { question, answer } = this.state

    return (
      <View style={styles.mainView}>
          <TextInput
            style={[styles.input, {margin: 0,}]}
            placeholder="Question"
            value={question}
            onChangeText={text => this.handleChange('question', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            value={answer}
            onChangeText={text => this.handleChange('answer', text)}
          />
          <TouchableOpacity
            disabled={question === '' || answer === '' }
            onPress={this.handleSubmit}
            style={[styles.button]}
          >
              <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingTop: '20%'
  },
  button: {   
    marginTop: 10,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: accent,
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

export default connect()(NewCard)
