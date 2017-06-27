'use strict'

import React, {Component} from 'react'

import {StyleSheet, View, Dimensions, Image, TouchableWithoutFeedback} from 'react-native'

import Video from 'react-native-video'

const windowWdith = Dimensions
  .get('window')
  .width
const defaultHeight = windowWdith

class VideoControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: false
    }
  }

  paused() {
    this
      .props
      ._paused()
    const pausedStat = this.state.paused
    this.setState({
      paused: !pausedStat
    })
  }

  hiddenControls() {
    console.log('[ass')
    this
      .props
      ._hiddenControls()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hiddenControls.bind(this)}>
        <View style={Style.controlsContainer}>
          <View style={Style.controlsShadow}></View>
          <View style={Style.controls}>
            <View style={Style.pausedControls}>
              {this.state.paused && (
                <TouchableWithoutFeedback
                  onPress={this
                  .paused
                  .bind(this)}>
                  <Image style={Style.play} source={require('../assets/img/start.png')}/>
                </TouchableWithoutFeedback>
              )}
              {!this.state.paused && (
                <TouchableWithoutFeedback
                  onPress={this
                  .paused
                  .bind(this)}>
                  <Image style={Style.play} source={require('../assets/img/pause.png')}/>
                </TouchableWithoutFeedback>
              )}
            </View>
            <View style={Style.nextControls}>
              <TouchableWithoutFeedback
                onPress={this
                .paused
                .bind(this)}>
                <Image style={Style.play} source={require('../assets/img/next.png')}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

const Style = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },
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
  }
})

export default VideoControls
