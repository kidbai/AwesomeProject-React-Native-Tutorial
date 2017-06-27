'use strict'

import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import Video from 'react-native-video'

const windowWdith = Dimensions.get('window').width
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
      video: Video,
      VideoControlsShow: false
    }
  }


  onLoad = (data) => {
    const newHeight = (this.state.style.width * data.naturalSize.height) / data.naturalSize.width
    console.log('onload')
    this.setState({
      style: {
        flex: 1,
        width: windowWdith,
        height: newHeight,
        alignItems: 'center'
      },
      paused: false
    })
  }

  onError = (res) => {
  }

  _paused () {
    const stat = this.state.paused
    this.setState({
      paused: !stat
    })
  }

  _VideoControlsShow () {
    const VideoControlsShowStat = this.state.VideoControlsShow
    console.log(VideoControlsShowStat)
    this.setState({
      VideoControlsShow: !VideoControlsShowStat
    })
  }

  render() {
    return (
      <View style={this.state.style}>
        { this.state.VideoControlsShow && (<VideoControls
          _paused={this._paused.bind(this)}
          _hiddenControls={this._VideoControlsShow.bind(this)}
        />)}
        <TouchableWithoutFeedback
          onPress={this._VideoControlsShow.bind(this)}
        >
          <View style={Style.video}>
            <Video
              source={{uri: this.props.videoLink}}   // Can be a URL or a local file.
              ref={(ref) => {
                this.video = ref
              }}                                      // Store reference
              rate={1.0}                              // 0 is paused, 1 is normal.
              volume={1.0}                            // 0 is muted, 1 is normal.
              muted={false}                           // Mutes the audio entirely.
              paused={this.state.paused}                          // Pauses playback entirely.
              resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
              repeat={false}                           // Repeat forever.
              playInBackground={false}                // Audio continues to play when app entering background.
              playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
              ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
              progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
              //  onLoadStart={this.loadStart}            // Callback when video starts to load
              onLoad={this.onLoad}               // Callback when video loads
              //  onProgress={this.setTime}               // Callback every ~250ms with currentTime
              //  onEnd={this.onEnd}                      // Callback when playback finishes
              onError={this.onError}               // Callback when video cannot be loaded
              //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //  onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
              style={Style.video} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  videoWrapper: {
    flex: 1,
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
  }
})

export default VideoPlayer
