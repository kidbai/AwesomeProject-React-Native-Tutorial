import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Video from '../layouts/Video'

const App = StackNavigator(
  {
    Video: {
      name: 'Video',
      screen: Video
    }
  },
  {
    headerMode: 'none',
    header: { visible: false },
  }
);

export default App
