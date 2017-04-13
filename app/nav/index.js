import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Home from '../Home'
import Good from '../Good'
import Topic from '../Topic'


const HomeStack = StackNavigator(
  {
    All: { screen: Home },
    Topic: { screen: Topic }
  },
  {
    initialRouteName: 'All',
    headerMode: 'screen',
  }
);

const GoodStack = StackNavigator(
  {
    Good: { screen: Home },
    Topic: { screen: Topic }
  },
  {
    initialRouteName: 'Good',
    headerMode: 'screen',
  }
);

const Drawer = DrawerNavigator({
  Drawer: {
    name: 'Drawer',
    screen: HomeStack
  },
  Good: {
    name: 'Good',
    screen: GoodStack
  }
}, {
  initialRouteName: 'Drawer',
  drawerWidth: 250,
  drawerPosition: 'left'
});

const App = StackNavigator(
  {
    Drawer: {
      name: 'Drawer',
      screen: Drawer
    }
  },
  {
    headerMode: 'none',
    header: { visible: false },
  }
);

export default App
