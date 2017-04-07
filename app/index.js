import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Button,
  TouchableHighlight
} from 'react-native'
import { getCnodeTopics } from '../api'
import { StackNavigator } from 'react-navigation'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props)

    this.state = {
      topics: ds
    }
  }
  fetchData() {
    getCnodeTopics()
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          topics: ds.cloneWithRows(res.data)
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
  componentWillMount() {
    this.fetchData()
  }
  _renderRow(rowData) {
    const { navigate } = this.props.navigation;
    return (
      <Text onPress={ () => navigate('chat')}>{ rowData.title ? rowData.title : null}</Text>
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ListView
          dataSource={ this.state.topics }
          renderRow={ (rowData) =>
            this._renderRow(rowData)
          }
        />
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Chat with ${state.params.topic}`,
  };
  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <Text>Chat with { params.topic }</Text>
      </View>
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});

export default App
