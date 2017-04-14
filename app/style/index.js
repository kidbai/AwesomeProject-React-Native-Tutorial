import { StyleSheet } from 'react-native';

const listStyle = StyleSheet.create({
  list: {
    paddingTop: 3,
    paddingBottom: 6,
    paddingLeft: 10,
    margin: 5,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  tab: {
    width: 50,
    height: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e5e5e5',
    overflow: 'hidden'
  },
  tabLight: {
    borderColor: '#80bd01',
    backgroundColor: '#80bd01',
  },
  tabTextWhite: {
    color: '#fff',
  },
  tabTextGray: {
    color: '#999',
  }
})

export default listStyle
