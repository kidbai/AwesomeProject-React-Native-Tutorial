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
import { getCnodeTopics } from '../api'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Home extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: '首页',
      // icon: ({ tintColor }) => (
        // <Text></Text>
      // ),
    }),
    header: ({ navigate }) => {
      title = '首页';
      left = (
        <TouchableOpacity onPress={() => navigate('DrawerOpen') }>
          <Image
            source={{ uri: 'https://cdn0.iconfinder.com/data/icons/ui-glyph/100/burger_menu-256.png' }}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableOpacity>
      )
      return { title, left };
    }
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
      <TouchableOpacity  onPress={() => navigate('Topics', { topic: rowData.title})}>
        <Text>{ rowData.title ? rowData.title : null}</Text>
      </TouchableOpacity>
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

class Topics extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `${state.params.topic}`,
  };
  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <Text>{ params.topic }</Text>
      </View>
    );
  }
}

const HomeStack = StackNavigator(
  {
    Home: { screen: Home },
    Topics: { screen: Topics }
  },
);

const DrawerNav = DrawerNavigator({
  Home: { screen: HomeStack },
}, {
  drawerWidth: 250,
  drawerPosition: 'left'
});

// const App = StackNavigator(
//   {
//     Home: { screen: DrawerNav },
//     Topics: { screen: Topics }
//   }
// );

export default DrawerNav
