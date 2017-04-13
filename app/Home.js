import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Button,
  Image,
  TouchableOpacity
} from 'react-native'
import { getPostType } from './utils'
import { getCnodeTopics } from '../api'
import listStyle from './style'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Home extends React.Component {
  static navigationOptions = {
    drawer: ({ state }) => {
      label = state.routeName;
      return  { label } ;
    },
    header: ({ navigate, state }) => {
      title = state.routeName;
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
    const { state } = this.props.navigation
    const type = getPostType(state.routeName)
    getCnodeTopics({
      tab: type,
    })
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
    const { navigate } = this.props.navigation
    return (
      <TouchableOpacity  onPress={() => navigate('Topic', { topic: rowData.title , id: rowData.id })}>
        <View style={ listStyle.list }>
          <View>
            <Text style={ listStyle.title }>{ rowData.title ? rowData.title : null}</Text>
          </View>
          <View>
            <Text style={ [listStyle.tab, rowData.top || rowData.good ? listStyle.tabLight: ''] }>{ rowData.tab || 'good' }</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { navigate } = this.props.navigation
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

export default Home
