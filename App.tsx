import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigations';

const App = () => {
  return <AppNavigation />;
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
