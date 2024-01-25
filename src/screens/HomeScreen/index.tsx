import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {navigationRef} from '../../navigations';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}} />

      <Image
        source={{
          uri: 'https://user-images.githubusercontent.com/306134/146549218-b7959ad9-0107-4c1c-b439-b96c780f5230.png',
        }}
        style={styles.logo}
      />
      <View style={{flex: 1}} />
      <Pressable
        style={styles.btn}
        onPress={() => navigationRef.navigate('GradientClockTutorial')}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
          }}>
          Start
        </Text>
      </Pressable>
      <View style={{flex: 1}} />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
  btn: {
    width: '60%',
    paddingVertical: 20,
    backgroundColor: '#3eb0d8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
});
