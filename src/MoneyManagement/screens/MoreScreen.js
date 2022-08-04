import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {auth} from '../firebase-config';
import {signOut} from 'firebase/auth';

const MoreScreen = () => {
  const [date, setDate] = useState(null)

  const LogOut = async () => {
    await signOut(auth);
  };

  useEffect(()=>{
    const t = new Date('2022-08-04')
    console.log(t)
  }, [])

  return (
    <View>
      <Button title="LogOut" onPress={LogOut} />
      <Text> {date} </Text>
    </View>
    
  );
};

export default MoreScreen;
