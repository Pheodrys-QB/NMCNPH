import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddScreen from "../screens/AddScreen"
import TransactionScreen from '../screens/TransactionScreen';
import MoreScreen from '../screens/MoreScreen';
import BudgetScreen from '../screens/BudgetScreen';
import BillScreen from '../screens/BillScreen';


const Tab = createBottomTabNavigator(); 
const AppStack = () => {


  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName='Transactions' screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Transactions" component={TransactionScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Bill" component={BillScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
    
};

export default AppStack;