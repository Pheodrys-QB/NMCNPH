import React from 'react';
import TransactionScreen from '../screens/TransactionScreen';
import SearchScreen from '../screens/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';

const TStack = createStackNavigator();

const TransStack = () => {
  return (
    <TStack.Navigator
      options={{
        headerBackTitleVisible: false,
      }}>
      <TStack.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{headerShown: false}}
      />

      <TStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: '',
          headerTransparent: 'true',
        }}
      />
    </TStack.Navigator>
  );
};

export default TransStack;
