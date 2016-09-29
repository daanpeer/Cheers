import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

import { MKButton } from 'react-native-material-kit'

import tts from 'react-native-android-speech'

import cheersData from './cheers.json'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  cheer: {
    fontSize: 40,
    margin: 30,
  },

  cheerButtonText: {
    fontSize: 40,
    color: 'white',
  },

  cheerButton: {
    marginBottom: 20,
  },

  beer: {
    fontSize: 90,
  },
})

const CheerButton = MKButton.coloredButton()
  .withTextStyle(styles.cheerButtonText)
  .withStyle(styles.cheerButton)
  .withText(' 🍻 LETS CHEER')
  .withOnPress(this.cheer)
  .build()

const SayButton = MKButton.coloredButton()
  .withText('HOW THE F* DO I SAY THIS!?')
  .withOnPress(this.speak)
  .build()

class cheers extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cheer: undefined,
    }

    this.cheer = this.cheer.bind(this)
    this.speak = this.speak.bind(this)

    tts.getLocales().then((locales) => {
      this.supported = cheersData.filter((cheer) => {
        return locales.indexOf(cheer.locale) !== -1
      })
      this.selectCheer()
    })
  }

  componentDidMount() {
  }

  selectCheer() {
    const cheer = this.supported[Math.floor(Math.random() * this.supported.length)]
    this.setState({ cheer })
  }

  cheer() {
    this.selectCheer()
  }

  speak() {
    tts.speak({
      text: this.state.cheer.string,
      forceStop: false,
      language: this.state.cheer.locale,
    })
  }

  render() {
    // probably still fetching a cheer
    if (this.state.cheer === undefined) {
      return (<View />)
    }

    return (
      <View style={styles.container}>

        <TouchableHighlight onPress={this.cheer}>
          <Text style={styles.beer}>
             🍻
          </Text>
        </TouchableHighlight>

        <Text style={styles.title}>
          Cheers in: {this.state.cheer.country}
        </Text>
        <Text style={styles.cheer}>
          {this.state.cheer.string}
        </Text>

        <CheerButton />

        <SayButton />

      </View>
    )
  }
}

AppRegistry.registerComponent('cheers', () => cheers)
