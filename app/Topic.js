import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  ListView,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from 'react-native'

import { getCnodeTopic } from '../api'
import HTMLView from './components/html-view'
import markDownStyle from './style/mark-down'

class Topic extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `${state.params.topic}`,
  };
  constructor(props) {
    super(props)

    this.state = {
      topic: {},
      loading: true
    }
  }
  fetchData() {
    const { params } = this.props.navigation.state
    return getCnodeTopic(params.id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          topic: res.data
        })
        return 'success'
      })
      .catch((e) => {
      })
  }
  componentWillMount() {
    this.setState({
      loading: true
    })
    this.fetchData()
    .then((res) => {
      if (res === 'success') {
        this.setState({
          loading: false
        })
      }
    })
  }
  render() {
    return (
      <ScrollView style={ markDownStyle.markDown }>
        <ActivityIndicator
          animating={this.state.loading}
          color='#80bd01'
          size='large'
          style={{position: 'absolute', width: 100, height:100, top: 150, left: (Dimensions.get('window').width / 2) - 50 }}
        />
        <HTMLView value={ this.state.topic.content || '' } />
      </ScrollView>
    );
  }
}

export default Topic
