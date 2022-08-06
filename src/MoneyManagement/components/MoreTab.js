//import React from 'react';
import React, {useState, useEffect} from 'react';
import { StyleSheet,Image, Text,View, Button, TouchableOpacity} from 'react-native';
import {auth} from '../firebase-config';
import {signOut} from 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';


export default function MoreTab (){
    const [date, setDate] = useState(null)
  
    const LogOut = async () => {
      await signOut(auth);
    };
  
    useEffect(()=>{
      const t = new Date('2022-08-04')
      console.log(t)
    }, [])
  
    return (
        <View>
            <ScrollView>
                <View style ={{padding:10,width:'100%',backgroundColor:'#000',height:150}}>
                    <TouchableOpacity>
                        <Image source = {require('../assets/blackBG.jpg')}
                        style={{width:30,height:30}}></Image>
                        <View></View>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source= {require('../assets/avatarLogo.png')}
                    style={{width:140,height:140,borderRadius:100,marginTop:-70}}></Image>
                    <Text style={{fontSize:25,fontWeight:'bold',padding:10}}>Hcmus User</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'grey'}}>20yo, Male</Text>
                    
                </View>
                <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#d6f6eb',
                                width:'90%',padding:20,paddingBottom:22,borderRadius:10,
                                shadowOpacity:80,
                                elevationL:15,
                                marginTop:20}}>
                    <Button color='#fbaa60' title='User setting'></Button>
                    
                </View>
                <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#d6f6eb',
                                width:'90%',padding:20,paddingBottom:22,borderRadius:10,
                                shadowOpacity:80,
                                elevationL:15,
                                marginTop:20}}>
                    <Button color='#fbaa60' title='Term of service'></Button>
                    
                </View>
                <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#d6f6eb',
                                width:'90%',padding:20,paddingBottom:22,borderRadius:10,
                                shadowOpacity:80,
                                elevationL:15,
                                marginTop:20}}>
                    <Button title='Log out' onPress={LogOut}></Button>
                    
                </View>
            </ScrollView>
            
        </View>
      
    );
  };
  
//   <Button title="LogOut" onPress={LogOut} />
//             <Text> {date} </Text>
  
  
//user screen
