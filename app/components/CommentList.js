'use strict'

import React, {Component} from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  NativeModules,
  ListView
} from 'react-native'

const {width, height} = Dimensions.get('window')
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentList: ds.cloneWithRows(['normal 1', 'vip', 'normal 2', 'reply'])
    }
  }

  _renderRow (rowData) {
    return (
      <View style={Style.commentList}>
        <View style={Style.user}>
          <View style={Style.left}>
            <View style={Style.avatar}>
              <Image
                style={Style.avatarImg}
              source={require('../assets/img/avatar.jpg')}
              />
            </View>
            <View style={Style.username}>
              <Text style={ rowData === 'vip' ? Style.usernameVip : ''}>{ rowData }</Text>
            </View>
          </View>
          <View style={Style.right}>
            <View style={Style.like}>
              <Image
                style={Style.likeImg}
                source={require('../assets/img/like.png')}
              />
              {rowData === 'vip' && (<Text style={Style.praiseNum}>2</Text>)}
            </View>
          </View>

        </View>
        <View style={Style.tag}>
          <View style={Style.gender}>
            <Image
              style={Style.genderImg}
              source={require('../assets/img/female.png')}
            />
          </View>
          <View style={Style.city}>
            <Text style={Style.cityName}>沈阳</Text>
          </View>
          { rowData === 'vip' && (<View style={Style.vip}>
            <Text style={Style.vipLevel}>VIP 7</Text>
          </View>) }
        </View>
        <View style={Style.commentContent}>
          <Text style={Style.commentContentText}>{ rowData + 'blahblahblah'}</Text>
        </View>
        { rowData === 'reply' && (<View style={Style.reply}>
          <View>
            <Text style={Style.replyUser}>
              father
              <Text style={Style.replyContent}>
              :好看看看看
              </Text>
            </Text>
          </View>
        </View>) }
        <View style={Style.time}>
          <Text style={Style.timeText}>43分钟前</Text>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View>
        <View>
          <Text style={Style.commentTitle}>最新评论</Text>
        </View>
        <ListView
          initialListSize={4}
          dataSource={this.state.commentList}
          renderRow={(rowData) => this._renderRow(rowData)}
        />
      </View>
    )
  }

}

const Style = StyleSheet.create({
  commentTitle: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  commentList: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  user: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15
  },
  avatar: {
    width: 30,
    height: 30
  },
  avatarImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: .5,
    borderColor: '#f2f2f2',
  },
  username: {
    marginLeft: 10
  },
  usernameVip: {
    color: '#DC143C'
  },
  tag: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 40
  },
  gender: {
    width: 14,
    height: 14,
    backgroundColor: 'pink',
    marginRight: 4,
    borderRadius: 2
  },
  genderImg: {
    width: 14,
    height: 14
  },
  city: {
    height: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9967A',
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
    marginRight: 4
  },
  cityName: {
    fontSize: 10,
    color: '#fff'
  },
  vip: {
    height: 14,
    backgroundColor: '#DC143C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2
  },
  vipLevel: {
    fontSize: 10,
    color: '#fff'
  },
  commentContent: {
    marginLeft: 40,
    paddingTop: 8
  },
  commentContentText: {
    fontSize: 15,
    color: '#000'
  },
  time: {
    marginLeft: 40,
    paddingTop: 12,
  },
  timeText: {
    fontSize: 9,
    color: '#a1a1a1'
  },
  like: {
    // position: 'absolute',
    // right: 0,
    // bottom: 8,
    width: 12,
    height: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  likeImg: {
    width: 12,
    height: 12
  },
  praiseNum: {
    marginLeft: 2,
    fontSize: 12
  },
  reply: {
    marginLeft: 40,
    height: 40,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10
  },
  replyUser: {
    fontSize: 12,
    color: '#1E90FF',
    marginRight: 3
  },
  replyContent: {
    fontSize: 12,
    color: '#a1a1a1'
  }
})

export default CommentList
