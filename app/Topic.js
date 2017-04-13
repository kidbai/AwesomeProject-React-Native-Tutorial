import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { getCnodeTopic } from '../api'
import HTMLView from './components/html-view'

class Topic extends React.Component {
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
      <View>
        <HTMLView value={ this.state.topic.content || '' } />
      </View>
    );
  }
}

export default Topic
