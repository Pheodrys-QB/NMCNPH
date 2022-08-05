import React from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignIn from "./SignInScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Splash = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style = {styles.logo}
                    source = {require('../assets/splash.png')}
                    resizeMode="stretch"
                /> 
            </View>
            <Text style={styles.title}>Have a better life with Money Management</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                    <LinearGradient
                        colors={['#f0892b', '#FBAA60']}
                        
                        style={styles.signIn}
                     >
                        <Text style={styles.textSign}>Get Started</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default Splash;

const {height} = Dimensions.get("screen")
const height_logo = height * 0.28
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#D6F6EB'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo,
        marginTop:160
    },
    title: {
        color: 'black',
        position:'absolute',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        marginTop: 420,
        paddingHorizontal: 110

    },
    button: {
        alignItems: 'center',
        marginTop: 160,
        minHeight: 200,
        paddingHorizontal: 80,
        
    },
    signIn: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        borderColor: 'black'
    },
    textSign: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        alignItems: 'center',
        lineHeight: 27,
        fontSize: 18
    }
  });