import React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator  options={{
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerTitle:'', headerStyle:{backgroundColor:'#CB2635',
          elevation: 0,borderBottomWidth: 0}}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerTitle:'',headerTintColor: 'white', headerStyle:{backgroundColor:'#CB2635',
          elevation: 0,borderBottomWidth: 0}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
