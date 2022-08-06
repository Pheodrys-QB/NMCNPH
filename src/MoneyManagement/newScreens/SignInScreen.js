import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {auth} from '../firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('FirstUser@gmail.com');
  const [password, setPassword] = useState('FirstUser');

  const SignIn = async () => {
    if (!email) {
      Alert.alert('Email missing', 'Email is reqired.\nPlease try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    if (!password) {
      Alert.alert('Email missing', 'Email is reqired.\nPlease try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{paddingTop: 60}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>Welcome to Money Management</Text>
        <Image
          style={styles.logo}
          source={require('../assets/moneybag.jpg')}
          resizeMode="stretch"
        />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={email}
            placeholder="Enter your email"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <TouchableOpacity onPress={SignIn}>
          <View styles={styles.button}>
            <LinearGradient
              colors={['#f0892b', '#FBAA60']}
              style={styles.logIn}>
              <Text style={[styles.textLogIn, {color: 'black'}]}>Log In</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
        <Text style={styles.bottomText1}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.bottomText2}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#D6F6EB',
  },
  title: {
    width: 250,
    height: 60,
    color: 'black',
    fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    display: 'flex',
    textAlign: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 56,
  },
  inputView: {
    backgroundColor: '#F6FBFA',
    borderRadius: 30,
    width: '70%',
    height: 37,
    width: 310,
    marginBottom: 15,
  },
  logIn: {
    width: 310,
    height: 60,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    marginLeft: 8,
  },
  textLogIn: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  bottomText1: {
    marginTop: 80,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  bottomText2: {
    marginTop: 10,
    fontSize: 16,
    color: '#4ABCBC',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  TextInput: {
    fontFamily: 'Poppins',
    height: 50,
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
  },
});
