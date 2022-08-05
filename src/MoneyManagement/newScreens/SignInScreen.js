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

const SignInScreen = ({navigation}) => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style = {styles.container}>
        <Text style={styles.title}>Welcome to Money Management</Text>
        <Image
                    style = {styles.logo}
                    source = {require('../assets/moneybag.jpg')}
                    resizeMode="stretch"
        /> 
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Enter your email"
            placeholderTextColor="#003f5c"
            autoCapitalize = "none"
            onChangeText={(email) => setEmail(email)}
        />
        </View>
 
        <View style={styles.inputView}>
           <TextInput
           style={styles.TextInput}
           placeholder="Enter your password"
           placeholderTextColor="#003f5c"
           autoCapitalize = "none"
           secureTextEntry={true}
           onChangeText={(password) => setPassword(password)}
        />
        </View>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <View styles={styles.button}>
                    <LinearGradient
                        colors={['#f0892b', '#FBAA60']}
                        style={styles.logIn}
                    >
                    <Text style={[styles.textLogIn,{color:'black'}]}>Log In</Text>
                    </LinearGradient>
                </View>
                </TouchableOpacity>
                <Text style={styles.bottomText1}>Don't have an account ?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={styles.bottomText2}>Sign Up</Text>
                </TouchableOpacity>
        </View>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 2, 
      backgroundColor: '#D6F6EB',
      alignItems: "center",
      justifyContent: "center",
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
        marginBottom: 60
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom:56
    },
    inputView: {
        backgroundColor: "#F6FBFA",
        borderRadius: 30,
        width: "70%",
        height: 37,
        width: 310,
        marginBottom: 15
    },
    logIn: {
        width: 310,
        height: 60,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'row',
        marginLeft: 8
    },
    textLogIn: {
        fontSize: 20,
        fontFamily:'Poppins',
        fontWeight: 'bold'
    },
    bottomText1: {
        marginTop: 80,
        fontSize: 16,
        color: 'black',
        fontFamily:'Poppins',
        fontWeight: 'bold'
    },
    bottomText2: {
        marginTop: 10,
        fontSize: 16,
        color: '#4ABCBC',
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