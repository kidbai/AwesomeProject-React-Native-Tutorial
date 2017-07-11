'use strict'

import React, {Component} from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeModules,
  Animated,
  Easing,
  ListView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableNativeFeedback
} from 'react-native'

const {width, height} = Dimensions.get('window')

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  sendComment () {
    console.log('send comment')
  }

  commentShadowClick () {
    this.props.commentShadowClick()
  }

  render() {
    return (
      <View style={Style.comment}>
        <TouchableNativeFeedback
          onPress={this.commentShadowClick.bind(this)}
        >
          <View style={Style.commentShadow}></View>
        </TouchableNativeFeedback>
        <KeyboardAvoidingView style={Style.commentArea} behavior='padding'>
          <TextInput
            style={Style.commentInput}
            placeholder='想勾搭，先评论'
            maxLength={100}
            onChangeText={(text) => this.setState({text})}
            value={this.state.commentText}
            autoFocus={true}
            multiline={true}
            autoCorrect={true}
            underlineColorAndroid="transparent"/>
          <View style={Style.action}>
            <Text style={Style.maxLength}>0/100</Text>
            <View style={Style.sendComment}>
              <Text
                onPress={this
                .sendComment
                .bind(this)}
                style={Style.sendCommentText}>
                发送
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }

}

const Style = StyleSheet.create({
  comment: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  commentShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: .5
  },
  commentText: {
    width: width
  },
  commentArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: '#f2f2f2',
    padding: 10,
    zIndex: 2
  },
  commentInput: {
    backgroundColor: '#fff',
    height: 75,
    borderRadius: 3,
    borderColor: '#999',
    borderWidth: .5,
    padding: 5,
    textAlignVertical: 'top',
    color: '#333',
    fontSize: 15
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10
  },
  maxLength: {
    marginRight: 10
  },
  sendComment: {
    width: 60,
    height: 24,
    backgroundColor: '#a1a1a1',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  sendCommentText: {
    color: '#fff',
    fontSize: 12
  }
})

export default CommentInput
