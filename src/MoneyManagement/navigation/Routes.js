import React, {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';

const Routes = () => {
  const user = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
