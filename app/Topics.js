import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native'

import { getCnodeTopic } from '../api'
import HTMLView from 'react-native-htmlview'

class Topics extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `${state.params.topic}`,
  };
  constructor(props) {
    super(props)

    this.state = {
      topic: {}
    }
  }
  fetchData() {
    const { params } = this.props.navigation.state
    getCnodeTopic(params.id)
      .then((res) => res.json())
      .then((res) => {

        this.setState({
          topic: res.data
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
  componentWillMount() {
    this.fetchData()
  }
  render() {
    return (
      <HTMLView value={ this.state.topic.content || '' }/>
    );
  }
}

export default Topics
