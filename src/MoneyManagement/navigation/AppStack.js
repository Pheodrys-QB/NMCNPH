import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import { auth } from '../firebase-config';
import { signOut } from "firebase/auth"


const AppStack = () => {
  const LogOut = async () =>{
    await signOut(auth);
  }

  return (
    <View>
      <Text> AppStack </Text>
      <Button title='Logout' onPress={LogOut}/>
    </View>
  );
    
};

export default AppStack;