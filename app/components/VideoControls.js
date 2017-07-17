'use strict'

import React, {Component} from 'react'

import {StyleSheet, View, Dimensions, Image, Text, TouchableNativeFeedback, Animated, Easing, PanResponder} from 'react-native'

import Video from 'react-native-video'
import { formatTime } from '../utils'

const {width, height} = Dimensions.get('window')

class VideoControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        controlsContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 2,
          opacity: 0
        }
      },
      controlsStat: {
        show: false
      },
      barBtn: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        zIndex: 3
      },
      progressPlayed: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 4,
        backgroundColor: '#42bcf4',
        zIndex: 2
      },
      progressPlayabled: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 4,
        backgroundColor: '#f2f2f2',
        zIndex: 2
      },
      progressBar: 0,
      playabled: 0,
      played: 0,
      barBtnPosition: 10,
      barBtnPositionInit: 10,
      videoStart: 10,
      progressBarInc: 0,
      barBtnDragStat: false,
      playTime: '00:00'
    }
  }

  paused() {
    if (this.state.controlsStat.show === false) {
      this.toggleControls()
      return false
    }
    this
      .props
      ._paused()
  }

  toggleControls() {
    this.setState({
      style: {
        controlsContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 2,
          opacity: this.state.style.controlsContainer.opacity === 0 ? 1 : 0
        }
      },
      controlsStat: {
        show: this.state.style.controlsContainer.opacity === 0 ? true : false
      }
    })
  }

  triggerFullScreen () {
    this
      .props
      ._triggerFullScreen()
  }

  seek (second) {
    this.props._seek(second)
  }

  setProgress(event) {
    this.setState({
      progressBar: event.nativeEvent.layout.width
    }, () => {
    })
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderGrant: ()=>{
      },
      onPanResponderMove: (evt,gs)=>{
        if (this.state.barBtnPositionInit + gs.dx < 0 || this.state.barBtnPositionInit + gs.dx > this.state.progressBar) {
          return false
        }
        this.setState({
          barBtnPosition: this.state.barBtnPositionInit + gs.dx,
          played: this.state.barBtnPositionInit + gs.dx,
          barBtnDragStat: true
        }, ()=> {
        })
      },
      onPanResponderRelease: (evt,gs)=>{
        this.setState({
          barBtnDragStat: false,
          barBtnPositionInit: this.state.barBtnPosition
        }, ()=> {
          const second = (this.state.barBtnPosition / this.state.progressBar) * this.props.duration
          this.seek(second)
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.duration === 0 || this.state.progressBar === 0) {
      return false
    }
    const width = (nextProps.currentTime / nextProps.duration) * this.state.progressBar
    const playabled = (nextProps.playableDuration / nextProps.duration) * this.state.progressBar
    const played = (nextProps.currentTime / nextProps.duration) * this.state.progressBar
    this.setState({
      playabled: playabled
    })
    if (!this.state.barBtnDragStat) {
      this.setState({
        played: played,
        barBtnPosition: played,
        barBtnPositionInit: played,
        playTime: formatTime(nextProps.currentTime)
      })
    }

  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.toggleControls.bind(this)}>
        <View style={this.state.style.controlsContainer}>
          <View style={Style.controlsShadow}></View>
          <View style={Style.controls}>
            <View style={Style.pausedControls}>
              {this.props.paused && (
                <TouchableNativeFeedback
                  onPress={this
                  .paused
                  .bind(this)}>
                  <Image style={Style.play} source={require('../assets/img/start.png')}/>
                </TouchableNativeFeedback>
              )}
              {!this.props.paused && (
                <TouchableNativeFeedback
                  onPress={this
                  .paused
                  .bind(this)}>
                  <Image style={Style.play} source={require('../assets/img/pause.png')}/>
                </TouchableNativeFeedback>
              )}
            </View>
            <View style={Style.nextControls}>
              <TouchableNativeFeedback
                onPress={this
                .paused
                .bind(this)}>
                <Image style={Style.play} source={require('../assets/img/next.png')}/>
              </TouchableNativeFeedback>
            </View>
            <View style={Style.progressWrap}>
              <View style={Style.progress}>
                <View style={Style.durationWrap}>
                  <Text style={Style.duration}>{this.state.playTime}</Text>
                </View>
                <View style={Style.progressBar}>
                  <View style={Style.barWrap}>
                    <View style={Style.bar}
                      onLayout={(event) => this.setProgress(event)}>
                    </View>
                    <TouchableNativeFeedback
                    >
                      <View style={[this.state.progressPlayabled, {width: this.state.playabled}]}>
                      </View>
                    </TouchableNativeFeedback>
                    <View style={[this.state.progressPlayed, {width: this.state.played}]}>
                    </View>
                  </View>
                  <View
                    {...this._panResponder.panHandlers}
                    style={[this.state.barBtn, {left: this.state.barBtnPosition}]}>
                  </View>
                </View>
                <View style={Style.fullscreen}>
                  <TouchableNativeFeedback
                    onPress={this.triggerFullScreen.bind(this)}
                  >
                    <Image
                      style={Style.fullscreenImg}
                      source={require('../assets/img/fullscreen.png')}
                    />
                  </TouchableNativeFeedback>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const Style = StyleSheet.create({
  controlsShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: .3,
    zIndex: 2
  },
  controls: {
    flex: 1,
    zIndex: 3
  },
  pausedControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 40,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  play: {
    width: 40,
    height: 40
  },
  progressWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  progress: {
    width: width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  durationWrap: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  duration: {
    fontSize: 12,
    color: '#fff'
  },
  progressBar: {
    flex: 7,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  barWrap: {
    position: 'relative',
    height: 4,
    // backgroundColor: '#f1f1f1'
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  fullscreen: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullscreenImg: {
    width: 30,
    height: 30
  }
})

export default VideoControls
