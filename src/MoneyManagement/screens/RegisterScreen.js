import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {auth} from '../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const Register = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.text_header}>Register !!!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textSign1}>Username</Text>
          <TextInput
            placeholder="Username"
            value={username}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={text => setUsername(text)}
          />
          <Text style={styles.textSign1}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.textSign1}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <Text style={styles.textSign1}>Confirm password</Text>
          <TextInput
            placeholder="Confirm password"
            value={confirmPassword}
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity styles={styles.button} onPress={Register}>
            <LinearGradient
              colors={['#C85D67', '#CB2635']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CB2635',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom:500,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  signIn: {
    width: 310,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    marginLeft: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSign1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
