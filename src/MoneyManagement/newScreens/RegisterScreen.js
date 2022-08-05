import React, {useState} from 'react';
import { 
    View, 
    Text, 
    Button,
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Image,
    Dimensions
} from 'react-native';
import Users from '../assets/users';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {auth} from '../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style = {styles.container}>
        <Text style={styles.title}>Register now!!!</Text>
        <Image
                    style = {styles.logo}
                    source = {require('../assets/moneybag.jpg')}
                    resizeMode="stretch"
        /> 
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Enter your username"
            placeholderTextColor="#003f5c"
            autoCapitalize = "none"
            onChangeText={username => setUsername(username)}
        />
        </View>
 
        <View style={styles.inputView}>
           <TextInput
           style={styles.TextInput}
           placeholder="Enter your email"
           placeholderTextColor="#003f5c"
           autoCapitalize = "none"
           secureTextEntry={true}
           onChangeText={email => setEmail(email)}
        />
        </View>
        <View style={styles.inputView}>
           <TextInput
           style={styles.TextInput}
           placeholder="Enter your password"
           placeholderTextColor="#003f5c"
           autoCapitalize = "none"
           secureTextEntry={true}
           onChangeText={password => setPassword(password)}
        />
        </View>
        <View style={styles.inputView}>
           <TextInput
           style={styles.TextInput}
           placeholder="Confirm your password"
           placeholderTextColor="#003f5c"
           autoCapitalize = "none"
           secureTextEntry={true}
           onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        />
        </View>
                <TouchableOpacity onPress={alert}>
                <View styles={styles.button}>
                    <LinearGradient
                        colors={['#f0892b', '#FBAA60']}
                        style={styles.signUp}
                    >
                    <Text style={[styles.textsignUp,{color:'black'}]}>Register</Text>
                    </LinearGradient>
                </View>
                </TouchableOpacity>
                
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 2, 
      backgroundColor: '#D6F6EB',
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom:56
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
        marginBottom: 20
    },
    inputView: {
        backgroundColor: "#F6FBFA",
        borderRadius: 30,
        width: "70%",
        height: 37,
        width: 310,
        marginBottom: 15
    },
    signUp: {
        width: 310,
        height: 60,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'row',
        marginLeft: 8
    },
    textsignUp: {
        fontSize: 20,
        fontFamily:'Poppins',
        fontWeight: 'bold'
    },
    TextInput: {
        fontFamily: 'Poppins',
        height: 50,
        flex: 1,
        alignItems: 'center',
        marginLeft: 20
    },
});