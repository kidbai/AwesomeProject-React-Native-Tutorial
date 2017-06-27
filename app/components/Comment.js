'use strict'

import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  NativeModules,
  Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window')

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={Style.commentContainer}>
        <View style={Style.commentBtn}>
          <Text style={Style.commentBtnText}>骚年，来一发评论吧</Text>
        </View>
        <View style={Style.iconList}>
          <View style={Style.iconItem}>
            <Image
              style={Style.icon}
              source={require('../assets/img/share.png')}
            />
          </View>
          <View style={Style.iconItem}>
            <Image
              style={Style.icon}
              source={require('../assets/img/message.png')}
            />
            <View style={Style.badge}>
              <Text style={Style.badgeText}>4123</Text>
            </View>
          </View>
          <View style={Style.iconItem}>
            <Image
              style={Style.icon}
              source={require('../assets/img/like.png')}
            />
          </View>
        </View>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  commentContainer: {
    width: width,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1
  },
  commentBtn: {
    flex: 6,
    width: width,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  commentBtnText: {
    marginLeft: 10
  },
  iconList: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconItem: {
    width: 35,
    height: 30
  },
  icon: {
    width: 25,
    height: 20,
    marginTop: 5
  },
  badge: {
    position: 'absolute',
    backgroundColor: '#f44842',
    borderRadius: 10,
    right: 0,
    paddingLeft: 2,
    paddingRight: 2
  },
  badgeText: {
    fontSize: 8,
    color: '#fff'
  }
})

export default Comment
