'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

class Video extends Component {
  _onPress () {
    console.log('button click')
  }
  render() {
    console.log('hello world')
    return (
      <View style={Style.navContainer}>
        <View style={Style.navLeft}>
          <View style={Style.navItem}>
            <Image
              style={Style.back}
              source={require('../assets/img/back.png')}
            />
          </View>
          <View style={Style.navItem}>
            <Image
              style={Style.cat}
              source={require('../assets/img/cat.jpeg')}
            />
          </View>
          <View style={Style.userName}>
            <Text style={Style.text}>Youngbye</Text>
          </View>
        </View>
        <View style={Style.navRight}>
          <View style={Style.follow}>
            <Text style={Style.followText}>+ 关注</Text>
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
    width: Dimensions.get('window').width,
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
    padding: 12
  },
  navRight: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12
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
  cat: {
    flex: 1,
    width: 26,
    height: 26,
    borderRadius: 50,
  },
  textBlack: {
    color: '#000'
  },
  follow: {
    width: 60,
    height: 26,
    borderRadius: 4,
    borderWidth: 1,
    // backgroundColor: '#000',
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
  }
})

export default Video
