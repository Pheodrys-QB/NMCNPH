import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Dimensions, Text, Image} from 'react-native';

import AddScreen from '../screens/AddScreen';
import TransactionScreen from '../screens/TransactionScreen';
import MoreScreen from '../screens/MoreScreen';
import BudgetScreen from '../screens/BudgetScreen';
import BillScreen from '../screens/BillScreen';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');
const AppStack = () => {
  return (
    <View
      style={{
        width,
        height,
      }}>
      <Tab.Navigator
        initialRouteName="Budget"
        
        screenOptions={{
          tabBarStyle: {
            height: 100,
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#e32f45"
        }}>
        <Tab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
              tabBarIcon: ({focused}) =>(
                <View>
                  <Text style={{color: focused? "#e32f45" : "#000", fontSize: 12,}}> home</Text>
                </View>
              )

          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionScreen}
          options={{
            // tabBarIcon: ({color, size}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            // tabBarIcon: ({color, size}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="Bill"
          component={BillScreen}
          options={{
            // tabBarIcon: ({color, size}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            // tabBarIcon: ({color, size}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AppStack;
