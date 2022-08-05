import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Dimensions, Text, Image} from 'react-native';

import AddScreen from '../screens/AddScreen';
import TransactionScreen from '../screens/TransactionScreen';
import MoreScreen from '../screens/MoreScreen';
import BudgetScreen from '../screens/BudgetScreen';
import BillScreen from '../screens/BillScreen';
import HomeScreen from '../screens/HomeScreen';

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
          name="Home"
          component={HomeScreen}
          options={{
              tabBarIcon: ({focused}) =>(
                <View>
                  <Text style={{color: focused? "#e32f45" : "#000", fontSize: 12,}}>Home</Text>
                </View>
              )

          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionScreen}
          options={{
            tabBarIcon: ({focused}) =>(
              <View>
                <Text style={{color: focused? "#e32f45" : "#000", fontSize: 12,}}>Trans</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({focused}) =>(
              <View>
                <Text style={{color: focused? "#e32f45" : "#000", fontSize: 12,}}>Add</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Bill"
          component={BillScreen}
          options={{
            tabBarIcon: ({focused}) =>(
              <View>
                <Text style={{color: focused? "#e32f45" : "#000", fontSize: 12,}}>Saving</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: ({focused}) =>(
              <View>
                <Text style={{color: focused? "#e32f45" : "#000", fontSize: 12,}}>More</Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AppStack;
