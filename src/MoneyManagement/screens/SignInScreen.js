import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {auth} from '../firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('FirstUser@gmail.com');
  const [password, setPassword] = useState('FirstUser');

  const SignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome !!!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textSign1}>Username</Text>
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
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          styles={styles.button}
          onPress={SignIn}>
          <LinearGradient colors={['#C85D67', '#CB2635']} style={styles.signIn}>
            <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          styles={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <LinearGradient
            colors={['#fff', '#fff']}
            style={[
              styles.signIn,
              {
                borderColor: '#CB2635',
                borderWidth: 1.5,
                marginTop: 15,
                borderRadius: 30,
              },
            ]}>
            <Text style={[styles.textSign, {color: '#CB2635'}]}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CB2635',
    borderColor:"#fff",
    borderWidth:0,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 50,
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
