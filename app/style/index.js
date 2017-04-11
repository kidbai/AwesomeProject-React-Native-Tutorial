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
    color: '#999',
    textAlign: 'center',
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e5e5e5',
    marginTop: 4,
    overflow: 'hidden'
  },
  tabLight: {
    borderColor: '#80bd01',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#80bd01',
    color: '#fff',
    overflow: 'hidden'
  }
})

export default listStyle
