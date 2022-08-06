import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {auth} from '../firebase-config';
import {signOut} from 'firebase/auth';
import MoreTab from '../components/MoreTab';
const MoreScreen = () => {
  
  return (
    <MoreTab/>
    
  );
};

export default MoreScreen;
