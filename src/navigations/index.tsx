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
const Stack = createNativeStackNavigator<RootStack>();
export const navigationRef = createNavigationContainerRef<RootStack>();

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarAnimation: 'slide',
          statusBarColor: 'transparent',
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="GradientClockTutorial"
          component={GradientClockTutorial}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
