import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"

const Routes = () => {
  const user = useContext(AuthContext);
  

  return <>{user ? <AppStack /> : <AuthStack />}</>
}

export default Routes;