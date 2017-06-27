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

class Navigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      follow: {
        stat: false,
        text: '+ 关注',
      }
    }
  }

  _backward () {
    NativeModules.IntentModule.startActivityFromJS('com.awesomeproject.SlActivity', 'back')
  }

  _followOnPress () {
    if (this.state.follow.stat === false) {
      this.setState({
       follow: {
         stat: true,
         text: '已关注'
       }
      })
    }
  }

  render() {
    return (
      <View style={Style.navContainer}>
        <View style={Style.navLeft}>
          <View style={Style.navItem}>
            <TouchableOpacity
              onPress={this._backward.bind(this)}>
              <Image
                style={Style.back}
                source={require('../assets/img/back.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={Style.navItem}>
            <Image
              style={Style.avatar}
              source={require('../assets/img/cat.jpeg')}
            />
          </View>
          <View style={Style.navItem}>
            <Text style={Style.username}>Youngbye</Text>
          </View>
        </View>
        <View style={Style.navRight}>
          <View style={Style.follow}>
            <TouchableOpacity
              onPress={this._followOnPress.bind(this)}
              >
              <Text style={Style.followText}>{this.state.follow.text}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={Style.menu}
              source={require('../assets/img/menu.png')}
            />
          </View>
        </View>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  navContainer: {
    width: width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navLeft: {
    flex: 1,
    width: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 12,
    paddingRight: 12
  },
  navRight: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 12,
    paddingRight: 12
  },
  navItem: {
    marginRight: 10
  },
  back: {
    width: 22,
    height: 22,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: '#fff'
  },
  username: {
    fontSize: 15
  },
  follow: {
    width: 60,
    height: 22,
    borderRadius: 2,
    borderWidth: .6,
    borderColor: '#0392d8',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center'
  },
  followText: {
    color: '#0392d8'
  },
  menu: {
    width: 20,
    height: 20,
    marginLeft: 15,
    marginRight: 3
  },
  avatar: {
    flex: 1,
    width: 22,
    height: 22,
    borderRadius: 50,
  },
})

export default Navigator
