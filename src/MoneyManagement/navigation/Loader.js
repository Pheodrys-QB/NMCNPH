import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack from './AppStack';
import Holder from '../screens/Holder';

const Stack = createStackNavigator();

const Loader = () => {
  return (
    <Stack.Navigator
      options={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Holder"
        component={Holder}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Loader;
