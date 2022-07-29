import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import { auth } from '../firebase-config';
import { signOut } from "firebase/auth"
import AddScreen from "../screens/AddScreen"
import TransactionScreen from '../screens/TransactionScreen';


const AppStack = () => {
  const LogOut = async () =>{
    await signOut(auth);
  }

  return (
      <TransactionScreen />
  );
    
};

export default AppStack;