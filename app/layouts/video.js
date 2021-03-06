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
  ListView,
  TextInput,
  Button
} from 'react-native'

import VideoPlayer from '../components/VideoPlayer'
import uuidv4 from 'uuid/v4'
import Navigator from '../components/Navigator.js'
import Comment from '../components/Comment.js'
import CommentInput from '../components/CommentInput.js'
import CommentList from '../components/CommentList.js'

const {width, height} = Dimensions.get('window')

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
class Video extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videoLink: '',
      defaultArr: [
        {
          title: '666',
          playTime: '1000',
          uuid: uuidv4()
        },
        {
          title: '888',
          playTime: '1000',
          uuid: uuidv4()
        },
        {
          title: '900',
          playTime: '1000',
          uuid: uuidv4()
        },
        {
          title: '878',
          playTime: '1000',
          uuid: uuidv4()
        }
      ],
      spin: new Animated.Value(0),
      like: new Animated.Value(0),
      likeCount: new Animated.Value(0),
      likeImgShow: false,
      // recommandListData: ds,
      recommandListData: [],
      recommandAllText: {
        width: width,
        fontSize: 14,
        textAlign: 'center'
      },
      recommandAllShow: true,
      fullScreen: false,
      commentText: '',
      commentShow: false,
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

  _likeAnimate () {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(
          this.state.like,
          {
          toValue: 1,
            duration: 200,
            easing: Easing.linear
          }
        ),
        Animated.timing(
          this.state.like,
          {
            toValue: 0,
            duration: 200,
            easing: Easing.linear
          }
        )
      ]),
      Animated.sequence([
        Animated.timing(
          this.state.likeCount,
          {
          toValue: 1,
            duration: 200,
            easing: Easing.linear
          }
        ),
        Animated.timing(
          this.state.likeCount,
          {
            toValue: 0,
            duration: 200,
            easing: Easing.linear
          }
        )
      ]),
    ]).start()
  }

  _like () {
    this.setState({
      likeImgShow: true
    }, ()=> {
      this._likeAnimate()
    })
  }

  _renderRow (rowData) {
    return (
      <View style={Style.recommandItem} key={'_item_' + rowData.uuid}>
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
    })
    const recommandListView = []
    for(let i = 0;i < this.state.defaultArr.length;i++) {
      recommandListView.push(
        this._renderRow(this.state.defaultArr[i])
      )
    }
    this.setState({
      recommandListData: recommandListView
    }, ()=> {
    })
  }

  _showAll () {
    this.setState({
      recommandAllShow: false
    })
    const randNum = (Math.random() * 1000).toFixed(0)
    const newData = [{
      title: (Math.random() * 1000).toFixed(0),
      playTime: (Math.random() * 1000).toFixed(0),
      uuid: uuidv4()
    },{
      title: (Math.random() * 1000).toFixed(0),
      playTime: (Math.random() * 1000).toFixed(0),
      uuid: uuidv4()
    },{
      title: (Math.random() * 1000).toFixed(0),
      playTime: (Math.random() * 1000).toFixed(0),
      uuid: uuidv4()
    },{
      title: (Math.random() * 1000).toFixed(0),
      playTime: (Math.random() * 1000).toFixed(0),
      uuid: uuidv4()
    }]
    const appendData = []
    for(let i = 0;i < newData.length;i++){
      appendData.push(
        this._renderRow(newData[i])
      )
    }
    const appendRecommandListViewData = this.state.recommandListData.concat(appendData)
    this.setState({
      recommandListData: appendRecommandListViewData
    }, ()=> {
    })
  }

  _triggerFullScreen () {
    this.setState({
      fullScreen: true
    })
  }

  commentClick () {
    this.setState({
      commentShow: !this.state.commentShow
    })
  }

  getComponentHeight (event) {
    console.log(event)
  }

  render() {
    return (
      <View style={Style.container}>
        {!this.state.fullScreen && (<Navigator />)}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Style.contentContainer}>
          <View style={Style.video}>
            <VideoPlayer videoLink={this.state.videoLink} _triggerFullScreen={this._triggerFullScreen.bind(this)}></VideoPlayer>
          </View>
          {!this.state.fullScreen && (<View>
            <View style={Style.titleContainer}>
              <Text style={Style.title}>这波操作太6了，这是一个能成为王者的超级兵</Text>
            </View>
            <View style={Style.actionContainer}>
              <View style={Style.acitionLeft}>
                <Animated.Text style={[Style.likeCount, {opacity: this.state.likeCount,
                fontSize: this.state.likeCount.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 15]
                })}]}>+1</Animated.Text>
                {!this.state.likeImgShow && (<TouchableWithoutFeedback onPress={this._like.bind(this)}>
                  <Image
                    style={Style.like}
                    source={require('../assets/img/like.png')}
                  />
                </TouchableWithoutFeedback>)}
                {this.state.likeImgShow && (<TouchableWithoutFeedback>
                  <Animated.Image
                    style={[Style.like, {transform: [{
                      scale: this.state.like.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.3]
                      })
                    }]}]}
                    source={require('../assets/img/like_on.png')}
                  />
                </TouchableWithoutFeedback>)}
              </View>
              <View style={Style.acitionRight}>
                <Image
                  style={Style.likeUser}
                  source={require('../assets/img/avatar.jpg')}
                />
                <Image
                  style={Style.likeUser}
                  source={require('../assets/img/avatar.jpg')}
                />
                <Image
                  style={Style.likeUser}
                  source={require('../assets/img/avatar.jpg')}
                />
                <Text style={Style.praisedNum}>18万赞</Text>
              </View>
            </View>
            <View style={Style.recommandWrapper}>
              <Text style={Style.recommandTitle}>相关推荐</Text>
              <View style={Style.recommandList} onLayout={(event) => this.getComponentHeight(event)}>
                { this.state.recommandListData }
              </View>
                {this.state.recommandAllShow && (<View style={Style.recommandAll}>
                  <TouchableOpacity
                    onPress={this._showAll.bind(this)}
                  >
                    <Text style={this.state.recommandAllText}>全部</Text>
                  </TouchableOpacity>
              </View>)}
            </View>
            <CommentList />
          </View>)}
        </ScrollView>
        <Comment
          commentClick={this.commentClick.bind(this)}
        />
        {this.state.commentShow && (<CommentInput commentShadowClick={this.commentClick.bind(this)}/>)}
      </View>
    )
  }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    backgroundColor: '#fff'
  },
  video: {
    width: width,
    backgroundColor: '#000'
  },
  titleContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    zIndex: 1
  },
  title: {
    fontSize: 17,
    color: '#000'
  },
  actionContainer: {
    paddingTop: 10,
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

  },
  likeCount: {
    position: 'absolute',
    top: -14,
    left: 4,
    fontSize: 12,
    color: '#1F8FCD',
    opacity: 1,
    fontWeight: 'bold'
  }
})

export default Video
