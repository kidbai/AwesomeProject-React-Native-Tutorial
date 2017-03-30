import React, { Component } from 'react'
import { AppRegistry, ListView, Text, View } from 'react-native'
import { getCnodeTopics } from '../api'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: ds
    }
  }
  fetchData() {
    getCnodeTopics()
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          dataSource: ds.cloneWithRows(res.data)
        })
      })
      .catch((e) => {
        alert(e)
      })
  }
  componentWillMount() {
    this.fetchData()
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 42}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title ? rowData.title : 'null'}</Text>}
        />
      </View>
    )
  }
}

export default App
