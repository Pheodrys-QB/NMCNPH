import React from 'react';
import {View, Button} from 'react-native';
import {auth} from '../firebase-config';
import {signOut} from 'firebase/auth';

const MoreScreen = () => {
  const LogOut = async () => {
    await signOut(auth);
  };

  return (
    <View>
      <Button title="LogOut" onPress={LogOut} />
    </View>
  );
};

export default MoreScreen;
