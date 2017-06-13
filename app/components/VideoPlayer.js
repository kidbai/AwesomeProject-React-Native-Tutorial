'use strict'

import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native'

import Video from 'react-native-video'

class VideoPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      style: {
        width: Dimensions.get('window').width,
        height: 0
      },
      video: Video
    }
  }


  onLoad = (data) => {
    const newHeight = (this.state.style.width * data.naturalSize.height) / data.naturalSize.width
    this.setState({
      style: {
        width: Dimensions.get('window').width,
        height: newHeight
      }
    })
  }

  render() {
    setTimeout(() => {
      console.log(this.player)
    }, 2000)
    return (
      <Video
       source={{uri:'http://video.kcloud.n0808.com/fd0f0ebbfd8eec66c9acb8e8c47529e4f4715097?sign=f431944bc4f607bb70d5291c4f8186d3&t=59403e3b&hash=0d3d5b8eb29389745939fe971bc3a266&ts=1497382459'}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       rate={1.0}                              // 0 is paused, 1 is normal.
       volume={1.0}                            // 0 is muted, 1 is normal.
       muted={false}                           // Mutes the audio entirely.
       paused={false}                          // Pauses playback entirely.
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
      //  onError={this.videoError}               // Callback when video cannot be loaded
      //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
      //  onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
       style={this.state.style} />
    )
  }
}

const Style = StyleSheet.create({
  video: {
    width: Dimensions.get('window').width,
    height: 250
  }
})

export default VideoPlayer
