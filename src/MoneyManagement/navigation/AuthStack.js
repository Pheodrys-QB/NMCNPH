import React from 'react';
import RegisterScreen from '../newScreens/RegisterScreen';
import SignInScreen from '../newScreens/SignInScreen';
import Splash from '../newScreens/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      options={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: '',
          headerTransparent: 'true',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
