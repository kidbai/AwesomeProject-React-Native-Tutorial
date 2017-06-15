'use strict'

import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeModules
} from 'react-native'

import VideoPlayer from '../components/VideoPlayer'

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

class Video extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videoLink: ''
    }
  }

  _onPress () {
    console.log('button click')
  }

  componentDidMount() {
    console.log(NativeModules)
    NativeModules.IntentModule.dataToJS((videoLink) => {
      console.log(videoLink);
      this.setState({
        videoLink: videoLink
      })
    },
      (result) => {
        console.log(result)
    })
  }

  render() {
    return (
      <View style={Style.container}>
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
            <View style={Style.navItem}>
              <Text style={Style.username}>Youngbye</Text>
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
        <ScrollView>
          <View Style={Style.section}>
            <View style={Style.video}>
              <VideoPlayer videoLink={this.state.videoLink}></VideoPlayer>
            </View>
            <View style={Style.titleContainer}>
              <Text style={Style.title}>这波操作太6了，这是一个能成为王者的超级兵</Text>
            </View>
            <View style={Style.actionContainer}>
              <View style={Style.acitionLeft}>
                <Image
                  style={Style.like}
                  source={require('../assets/img/like.png')}
                />
              </View>
              <View style={Style.acitionRight}>
                <Image
                  style={Style.likeUser}
                  source={require('../assets/img/head.png')}
                />
                <Image
                  style={Style.likeUser}
                  source={require('../assets/img/head.png')}
                />
                <Image
                  style={Style.likeUser}
                  source={require('../assets/img/head.png')}
                />
                <Text Style={Style.praisedNum}>18万赞</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  container: {
    width: Width,
    height: Height
  },
  navContainer: {
    width: Width,
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
  username: {
    fontSize: 15
  },
  follow: {
    width: 60,
    height: 26,
    borderRadius: 4,
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
  video: {
    width: Width,
    backgroundColor: '#000'
  },
  titleContainer: {
    padding: 10
  },
  title: {
    fontSize: 17,
    color: '#000'
  },
  actionContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  acitionLeft: {
    flex: 1
  },
  acitionRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  like: {
    width: 20,
    height: 20
  },
  likeUser: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  praisedNum: {
  },
  section: {
    backgroundColor: '#fff',
    borderWidth: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#f2f2f2'
  }
})

export default Video
