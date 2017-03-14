import React, { Component } from 'react' 
import { AppRegistry, Text } from 'react-native'

class HelloWorldApp extends Component {
  render() {
    return (
      <Text>Hello World!</Text>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => HelloWorldApp)

