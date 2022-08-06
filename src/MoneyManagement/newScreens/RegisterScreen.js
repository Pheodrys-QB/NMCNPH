import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {auth, db} from '../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const LogUser = async user => {
    await setDoc(doc(db, 'cities', user.uid), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });
  };

  const Register = async () => {
    if (!username) {
      Alert.alert(
        'Username missing',
        'Username is reqired.\nPlease try again.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    if (!email) {
      Alert.alert('Email missing', 'Email is reqired.\nPlease try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    if (!password) {
      Alert.alert(
        'Password missing',
        'Password is required.\nPlease try again.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    if (password != confirmPassword) {
      Alert.alert(
        'Reconfirm your Password',
        'Confirmed password does not match your password.\nPlease try again.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = credential.user;
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email:email,
      });
      console.log(username, email, user.uid)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{paddingTop: 100}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>Register now!!!</Text>
        <Image
          style={styles.logo}
          source={require('../assets/moneybag.jpg')}
          resizeMode="stretch"
        />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={username}
            placeholder="Enter your username"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={username => setUsername(username)}
          />
        </View>

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
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={confirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={confirmPassword =>
              setConfirmPassword(confirmPassword)
            }
          />
        </View>
        <TouchableOpacity onPress={Register}>
          <View styles={styles.button}>
            <LinearGradient
              colors={['#f0892b', '#FBAA60']}
              style={styles.signUp}>
              <Text style={[styles.textsignUp, {color: 'black'}]}>
                Register
              </Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#D6F6EB',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 56,
  },
  title: {
    width: 250,
    height: 60,
    color: 'black',
    fontFamily: 'Poppins',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: 'bold',
    display: 'flex',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: '#F6FBFA',
    borderRadius: 30,
    width: '70%',
    height: 37,
    width: 310,
    marginBottom: 15,
  },
  signUp: {
    width: 310,
    height: 60,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    marginLeft: 8,
  },
  textsignUp: {
    fontSize: 20,
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
