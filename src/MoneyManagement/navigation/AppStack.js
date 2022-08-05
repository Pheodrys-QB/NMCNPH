import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Dimensions, Text, Image} from 'react-native';

import AddScreen from '../screens/AddScreen';
import TransactionScreen from '../screens/TransactionScreen';
import MoreScreen from '../screens/MoreScreen';
import SavingScreen from '../screens/SavingScreen';
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
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            height: 100,
            backgroundColor: '#D6F6EB',
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center' , justifyContent:'center'}}>
                <Image
                  source={require('../assets/home.png')}
                  resizeMode={'contain'}
                  style={{width: 30, height: 30, tintColor: focused ? '#e32f45' : '#000'}}
                />
                <Text
                  style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center' , justifyContent:'center'}}>
                <Image
                  source={require('../assets/transactions.png')}
                  resizeMode={'contain'}
                  style={{width: 30, height: 30, tintColor: focused ? '#e32f45' : '#000'}}
                />
                <Text
                  style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>
                  Transactions
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center' , justifyContent:'center'}}>
                <Image
                  source={require('../assets/add.png')}
                  resizeMode={'contain'}
                  style={{width: 50, height: 50, tintColor: focused ? '#e32f45' : '#000'}}
                />
      
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Saving"
          component={SavingScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center' , justifyContent:'center'}}>
                <Image
                  source={require('../assets/saving.png')}
                  resizeMode={'contain'}
                  style={{width: 30, height: 30, tintColor: focused ? '#e32f45' : '#000'}}
                />
                <Text
                  style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center' , justifyContent:'center'}}>
                <Image
                  source={require('../assets/more.png')}
                  resizeMode={'contain'}
                  style={{width: 30, height: 30, tintColor: focused ? '#e32f45' : '#000'}}
                />
                <Text
                  style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>
                  More
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AppStack;
