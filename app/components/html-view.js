import React, { PropTypes } from 'react'
import { Dimensions, Image, View, StyleSheet, Text, Linking } from 'react-native'
import RNHtmlView from 'react-native-htmlview'
import { parseImgUrl } from '../utils'

const screenWidth = Dimensions.get("window").width

function uniqueId(min = 1, max = 10000) {
    var range = max - min
    return min + Math.round(Math.random() * range)
}

const fontSize = 14
const rowMargin = 5

const styles = StyleSheet.create({
  a: {
    color: 'royalblue',
    fontSize: 15,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 10,
    marginLeft: 10
  },
  p: {
    fontSize: fontSize
  },
  image: {
    width: screenWidth - 20,
    height: screenWidth - 20,
    resizeMode: Image.resizeMode.center
  },
  ul: {
    padding: 0,
    marginBottom: 8,
    marginLeft: 15
  },
  h1: {
    fontSize: fontSize * 1.6,
    fontWeight: "bold",
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center'
  },
  h1wrapper: {
    marginTop: rowMargin,
    marginBottom: rowMargin
  },
  h2: {
    fontSize: fontSize * 1.5,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.85)'
  },
  h2wrapper: {
    marginBottom: rowMargin,
    marginTop: rowMargin
  },
  h3: {
    fontWeight: 'bold',
    fontSize: fontSize * 1.4,
    color: 'rgba(0,0,0,0.8)'
  },
  h3wrapper: {
    marginBottom: rowMargin - 2,
    marginTop: rowMargin - 2
  },
  h4: {
    fontSize: fontSize * 1.3,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h4wrapper: {
    marginBottom: rowMargin - 2,
    marginTop: rowMargin - 2,
  },
  h5: {
    fontSize: fontSize * 1.2,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h5wrapper: {
    marginBottom: rowMargin - 3,
    marginTop: rowMargin - 3,
  },
  h6: {
    fontSize: fontSize * 1.1,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h6wrapper: {
    marginBottom: rowMargin - 3,
    marginTop: rowMargin - 3
  },
})

class HtmlView extends React.Component {
  constructor(props) {
    super(props)
  }

  _handleLinkPress(url) {
    Linking.canOpenURL(url).then(support => {
      if (support) {
          Linking.openURL(url)
      }
    }).catch(err => console.log(err))
  }

  _onImageLoadEnd(url, index) {
    console.log('onload')
    Image.getSize(uri, (w, h) => {
      console.log(screenWidth)
      if (w >= screenWidth) {
        w = screenWidth
        h = (screenWidth / w) * h
      }
      console.log('getsize')
      // style.image.width = w
      // style.image.height = h
      // console.log(style.image.width)
      // console.log(style.image.heigth)
    }, err => {})
  }

  _renderNode(node, index) {
    if (node.name == 'iframe') {
      return (
        <View key={'iframe_'+index} style={{width: 200, height: 200}}>
          <Text>{node.attribs.src}</Text>
        </View>
      )
    }
    if (node.name === 'img') {
      const uri = node.attribs.src
      console.log(screenWidth)
      return (
        <Image source={{uri: parseImgUrl(uri)}} style={styles.image} key={'img_'+index} resizeMode="center"
        onLoadEnd={()=>this._onImageLoadEnd(uri,index)} />
      )
    }
  }

  render() {
    const { value } = this.props
    return (
        <View>
          <RNHtmlView value={value} stylesheet={styles} onLinkPress={this._handleLinkPress} renderNode={this._renderNode} />
        </View>
    )
  }
}



export default HtmlView
