import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Button,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { getPostType } from './utils'
import { getCnodeTopics } from '../api'
import listStyle from './style'
import { tabFilter } from './filters'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Home extends React.Component {
  static navigationOptions = {
    drawer: ({ state }) => {
      label = tabFilter(state.routeName);

      return  { label } ;
    },
    header: ({ navigate, state }) => {
      title = tabFilter(state.routeName);
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
      topics: ds,
      refreshing: false,
      loading: false
    }
  }
  fetchData() {
    const { state } = this.props.navigation
    const type = getPostType(state.routeName)
    return getCnodeTopics({
      tab: type,
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          topics: ds.cloneWithRows(res.data)
        })
        return 'success'
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
          <View style={ [listStyle.tab, rowData.top || rowData.good ? listStyle.tabLight: ''] }>
            <Text style={ rowData.top || rowData.good ? listStyle.tabTextWhite: listStyle.tabTextGray }>{ tabFilter(rowData.tab) }</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _onRefresh() {
    this.setState({
      refreshing: true
    })
    this.fetchData()
    .then((res) => {
      if(res === 'success') {
        this.setState({
          refreshing: false
        })
      }
    })
  }
  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this._onRefresh()} />
    )
  }
  _endReached() {
    console.log('end reached')
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <ActivityIndicator
          animating={this.state.loading}
          color='#000'
          size='large'
          style={{position: 'absolute', width: 100, height:100, top: 150, left: (Dimensions.get('window').width / 2) - 50, zIndex: 2}}
        />
        <ListView
          dataSource={ this.state.topics }
          renderRow={ (rowData) =>
            this._renderRow(rowData)
          }
          refreshControl={this._refreshControl()}
          onEndReached={this._endReached.bind(this)}
          onEndReachedThreshold={10}
        />
      </View>
    )
  }
}

export default Home
