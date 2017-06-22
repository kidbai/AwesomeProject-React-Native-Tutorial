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
  TouchableWithoutFeedback,
  ScrollView,
  NativeModules,
  Animated,
  Easing,
  ListView
} from 'react-native'

import VideoPlayer from '../components/VideoPlayer'

const {width, height} = Dimensions.get('window')

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
class Video extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videoLink: '',
      follow: {
        stat: false,
        text: '+ 关注',
      },
      defaultArr: [
        {
          title: '666',
          playTime: '1000'
        },
        {
          title: '888',
          playTime: '1000'
        },
        {
          title: '900',
          playTime: '1000'
        },
        {
          title: '878',
          playTime: '1000'
        }
      ],
      spin: new Animated.Value(0),
      like: new Animated.Value(0),
      likeImg: require('../assets/img/like.png'),
      recommandListData: ds
    }
  }

  animate () {
    this.state.spin.setValue(0)
    Animated.timing(
      this.state.spin,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  likeAnimate () {
    this.state.like.setValue(0)
    Animated.timing(
      this.state.like,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }
    ).start(()=> this.likeAnimate())

  }

  _like () {
    this.setState({
      likeImg: require('../assets/img/like_on.png')
    }, ()=> {
      this.likeAnimate()
    })
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

  _backward () {
    NativeModules.IntentModule.startActivityFromJS('com.awesomeproject.SlActivity', 'back')
  }

  _renderRow (rowData) {
    return (
      <View style={Style.recommandItem}>
        <Image
          style={Style.recommandImage}
          source={require('../assets/img/flower.jpeg')}
        />
        <View style={Style.recommandText}>
          <Text style={Style.recommandItemTitle}>{rowData.title}</Text>
          <Text style={Style.recommandItemInfo}>啦啦啦啦   {rowData.playTime}万次观看</Text>
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.animate()
    NativeModules.IntentModule.dataToJS((videoLink) => {
      this.setState({
        videoLink: videoLink
      })
    },
      (result) => {
        console.log(result)
    })
    this.setState({
      recommandListData: ds.cloneWithRows(this.state.defaultArr)
    })
  }

  _showAll () {
    const randNum = (Math.random() * 1000).toFixed(0)
    const newData = [{
      title: (Math.random() * 1000).toFixed(0),
      playTime: (Math.random() * 1000).toFixed(0)
    },{
      title: (Math.random() * 1000).toFixed(0),
      playTime: (Math.random() * 1000).toFixed(0)
    }]
    const newArr = this.state.defaultArr.concat(newData)
    this.setState({
      defaultArr: newArr
    }, ()=> {
      this.setState({
        recommandListData: ds.cloneWithRows(this.state.defaultArr)
      })
    })
  }

  render() {
    return (
      <View style={Style.container}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Style.contentContainer}>
          <View style={Style.video}>
            <VideoPlayer videoLink={this.state.videoLink}></VideoPlayer>
          </View>
          <View>
            <View style={Style.titleContainer}>
              <Text style={Style.title}>这波操作太6了，这是一个能成为王者的超级兵</Text>
            </View>
            <View style={Style.actionContainer}>
              <View style={Style.acitionLeft}>
                <TouchableWithoutFeedback onPress={this._like.bind(this)}>
                  <Animated.Image
                    style={[Style.like, {transform: [{
                      scale: this.state.like.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.3]
                      })
                    }]}]}
                    source={this.state.likeImg}
                  />
                </TouchableWithoutFeedback>
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
                <Text style={Style.praisedNum}>18万赞</Text>
              </View>
            </View>
            <View style={Style.recommandWrapper}>
              <Text style={Style.recommandTitle}>相关推荐</Text>
              <ListView
                style={Style.recommandList}
                dataSource={this.state.recommandListData}
                renderRow={(rowData) => this._renderRow(rowData)}
              />
              <View style={Style.recommandAll}>
                <TouchableOpacity
                  onPress={this._showAll.bind(this)}
                  >
                  <Text style={Style.recommandAllText}>全部</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={Style.commentContainer}>
          <Text style={Style.commentText}>comment here</Text>
        </View>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navContainer: {
    width: width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentContainer: {
    backgroundColor: '#fff'
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
    width: 22,
    height: 22,
    borderRadius: 50,
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
  video: {
    width: width,
    backgroundColor: '#000'
  },
  titleContainer: {
    margin: 10,
    zIndex: 1
  },
  title: {
    fontSize: 17,
    color: '#000'
  },
  actionContainer: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: 10,
    borderColor: '#f2f2f2',
    zIndex: 2
  },
  acitionLeft: {
    flex: 1
  },
  acitionRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 200,
    zIndex: 2,
    opacity: 1
  },
  loading: {
    width: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: (width / 2) - 25
  },
  recommandWrapper: {
    position: 'relative',
    backgroundColor: '#fff',
    zIndex: 1,
    borderStyle: 'solid',
    borderBottomWidth: 10,
    borderBottomColor: '#f2f2f2',
    // marginBottom: 40
  },
  recommandTitle: {
    position: 'relative',
    fontSize: 15,
    margin: 15,
    fontWeight: 'bold',
    color: '#333'
  },
  recommandList: {
    position: 'relative',
    marginRight: 15,
    marginLeft: 15
  },
  recommandItem: {
    height: 80,
    flexDirection: 'row'
  },
  recommandImage: {
    width: 120,
    height: 67.5,
    marginRight: 15
  },
  recommandText: {
    width: width - 165,
    height: 67.5,
    flexDirection: 'column'
  },
  recommandItemTitle: {
    fontSize: 15,
    color: '#333'
  },
  recommandItemInfo: {
    marginTop: 10,
    fontSize: 10,
    color: '#666'
  },
  recommandAll: {
    width: width,
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recommandAllText: {
    width: width,
    fontSize: 14,
    textAlign: 'center'
  },
  commentContainer: {
    width: width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  commentText: {
    width: width
  }
})

export default Video
