import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  
  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
  })

  return <>{user ? <AppStack /> : <AuthStack />}</>
}

export default Routes;