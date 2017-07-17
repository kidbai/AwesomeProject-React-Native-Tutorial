'use strict'

import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableNativeFeedback
} from 'react-native'

import Video from 'react-native-video'

const windowWdith = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const defaultHeight = windowWdith

import VideoControls from './VideoControls'

class VideoPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      style: {
        flex: 1,
        width: windowWdith,
        height: defaultHeight,
        alignItems: 'center'
      },
      videoStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1
      },
      video: Video,
      VideoControlsShow: false,
      VideoControls: {
        opacity: 0
      },
      duration: 0,
      currentTime: 0,
      playableDuration: 0
    }
  }


  onLoad = (data) => {
    console.log(data)
    const newHeight = (this.state.style.width * data.naturalSize.height) / data.naturalSize.width
    this.setState({
      style: {
        flex: 1,
        width: windowWdith,
        height: newHeight,
        alignItems: 'center'
      },
      paused: false,
      duration: data.duration
    })
  }

  onError = (res) => {
  }

  onProgress = (data) => {
    this.setState({
      currentTime: data.currentTime,
      playableDuration: data.playableDuration
    },() => {
    })
  }

  onEnd = () => {
    this.setState({
      currentTime: 0,
    }, () => {
    })
  }

  _paused () {
    this.setState({
      paused: !this.state.paused
    })
  }

  _triggerFullScreen () {
    this
      .props
      ._triggerFullScreen()
  }

  _seek (second) {
    this.player.seek(second)
  }

  render() {
    return (
      <View style={this.state.style}>
        <VideoControls
          _paused={this._paused.bind(this)}
          paused={this.state.paused}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          playableDuration={this.state.playableDuration}
          _triggerFullScreen={this._triggerFullScreen.bind(this)}
          _seek={(second) => this._seek(second)}
        />
        <TouchableNativeFeedback
        >
          <View style={this.state.videoStyle}>
            <Video
              source={{uri: this.props.videoLink}}   // Can be a URL or a local file.
              ref={ref => this.player = ref}                                    // Store reference
              rate={1.0}                              // 0 is paused, 1 is normal.
              volume={1.0}                            // 0 is muted, 1 is normal.
              muted={false}                           // Mutes the audio entirely.
              paused={this.state.paused}                          // Pauses playback entirely.
              resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
              repeat={true}                           // Repeat forever.
              playInBackground={false}                // Audio continues to play when app entering background.
              playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
              ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
              progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
              //  onLoadStart={this.loadStart}            // Callback when video starts to load
              onLoad={this.onLoad}               // Callback when video loads
              onProgress={this.onProgress}               // Callback every ~250ms with currentTime
              onEnd={this.onEnd}                      // Callback when playback finishes
              onError={this.onError}               // Callback when video cannot be loaded
              //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //  onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
              style={this.state.videoStyle} />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  videoWrapper: {
    width: windowWdith,
    height: defaultHeight,
    alignItems: 'center'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  VideoControls: {
    opacity: 0
  }
})

export default VideoPlayer
