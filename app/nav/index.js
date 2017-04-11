import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Home from '../Home'
import Good from '../Good'
import Topics from '../Topics'


const HomeStack = StackNavigator(
  {
    All: { screen: Home },
    Topics: { screen: Topics }
  },
  {
    initialRouteName: 'All',
    headerMode: 'screen',
  }
);

const GoodStack = StackNavigator(
  {
    Good: { screen: Home },
    Topics: { screen: Topics }
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
