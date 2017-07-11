'use strict'

import React, {Component} from 'react'

import {StyleSheet, View, Dimensions, Image, Text, TouchableNativeFeedback, Animated, Easing} from 'react-native'

import Video from 'react-native-video'

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
      barBtn: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: new Animated.Value(0),
        backgroundColor: '#fff',
        borderRadius: 50,
        zIndex: 1
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
      progressBar: 0,
      lastProgressbar: 0,
      newProgressBar: 0
    }
  }

  paused() {
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
      }
    })
  }

  triggerFullScreen () {
    this
      .props
      ._triggerFullScreen()
  }

  setProgress(event) {
    this.setState({
      progressBar: event.nativeEvent.layout.width
    })
  }

  componentWillReceiveProps() {
    if (this.props.duration === 0) {
      return false
    }
    const width = (this.props.currentTime / this.props.duration) * this.state.progressBar
  //   this.setState({
  //     lastProgressbar: this.state.newProgressBar,
  //     newProgressBar: width,
  //     progressPlayed: width
  //   })
  //   Animated.timing(
  //     this.state.barBtn.left,
  //     {
  //       toValue: 1,
  //       duration: 50,
  //       easing: Easing.linear
  //     }
  //   ).start()
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
                  <Text style={Style.duration}>00:00</Text>
                </View>
                <View style={Style.progressBar}>
                  <View style={Style.barWrap}>
                    <View style={Style.bar} onLayout={(event) => this.setProgress(event)}>
                    </View>
                    <View style={this.state.progressPlayed}>
                    </View>
                  </View>
                  <Animated.View style={[this.state.barBtn, {transform: [{
                    translateX: this.state.barBtn.left.interpolate({
                        inputRange: [0, 1],
                        outputRange: [this.state.lastProgressbar, this.state.newProgressBar]
                      })
                  }]}]}>
                  </Animated.View>
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
    backgroundColor: '#f1f1f1',
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
