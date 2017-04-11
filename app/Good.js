import React from 'react'
import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native'

class Good extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Good',
    }),
    header: ({ navigate, state }) => {
      title = state.routeName,
      left = (
        <TouchableOpacity onPress={() => navigate('DrawerOpen') }>
          <Image
            source={{ uri: 'https://cdn0.iconfinder.com/data/icons/ui-glyph/100/burger_menu-256.png' }}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableOpacity>
      )
      return { title, left };
    }

  };
}

export default Good
