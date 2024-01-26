import {View, Text} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GradientClockTutorial from '../screens/GradientClockTutorial';
import BendingCircleAnimation from '../screens/BendingCircleAnimation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChasingMouseBubbles from '../screens/ChasingMouseBubbles';
const Drawer = createDrawerNavigator<RootStack>();
export const navigationRef = createNavigationContainerRef<RootStack>();

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        screenOptions={{
          lazy: true,
        }}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen
          name="GradientClockTutorial"
          component={GradientClockTutorial}
        />
        <Drawer.Screen
          name="BendingCircleAnimation"
          component={BendingCircleAnimation}
        />
        <Drawer.Screen
          name="ChasingMouseBubbles"
          component={ChasingMouseBubbles}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
