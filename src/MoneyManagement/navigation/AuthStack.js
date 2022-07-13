import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {auth} from '../firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthStack = () => {
  const [email, setEmail] = useState('FirstUser@gmail.com');
  const [password, setPassword] = useState('FirstUser');

  const Register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const SignIn = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log(err);
      }  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Register" onPress={Register} />
      <Button title="Sign in" onPress={SignIn} />
    </View>
  );
};

export default AuthStack;
