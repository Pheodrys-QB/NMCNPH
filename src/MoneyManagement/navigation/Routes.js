import React, {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import Loader from './Loader';
import {NavigationContainer} from '@react-navigation/native';

const Routes = () => {
  const user = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <Loader /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
