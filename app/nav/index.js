import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Home from '../Home'
import Good from '../Good'
import Topic from '../Topic'

// 全部
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

// 精华
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

// 问答
const AskStack = StackNavigator(
  {
    Ask: { screen: Home },
    Topic: { screen: Topic }
  },
  {
    initialRouteName: 'Ask',
    headerMode: 'screen',
  }
);

// 分享
const ShareStack = StackNavigator(
  {
    Share: { screen: Home },
    Topic: { screen: Topic }
  },
  {
    initialRouteName: 'Share',
    headerMode: 'screen',
  }
);

// 招聘
const JobStack = StackNavigator(
  {
    Job: { screen: Home },
    Topic: { screen: Topic }
  },
  {
    initialRouteName: 'Job',
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
  },
  Ask: {
    name: 'Ask',
    screen: AskStack
  },
  Share: {
    name: 'Share',
    screen: ShareStack
  },
  Job: {
    name: 'Job',
    screen: JobStack
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
