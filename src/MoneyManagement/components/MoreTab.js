//import React from 'react';
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {auth, db} from '../firebase-config';
import {signOut} from 'firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../navigation/AuthProvider';
import {doc, getDoc} from 'firebase/firestore';

export default function MoreTab() {
  const user = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    if (user) {
      const ref = doc(db, 'users', user.uid);
      const snapshot = await getDoc(ref);
      setUserData(snapshot.data());
    }
  };

  useEffect(() => {
    getUserData()
  }, []);

  const LogOut = async () => {
    await signOut(auth);
  };

  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: '100%',
            backgroundColor: '#D6F6EB',
            height: 150,
          }}></View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/avatarLogo.png')}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: -70,
            }}></Image>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              padding: 10,
              color: '#000000',
            }}>
            {userData ? userData.username : 'No username'}
          </Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000000'}}>
            {userData ? userData.email : 'No email'}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
          }}>
          <TouchableOpacity style={styles.button}>
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{height: 20}}></View>
          <TouchableOpacity style={styles.button}>
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                Terms of service
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{height: 20}}></View>

          <TouchableOpacity style={styles.button} onPress={LogOut}>
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                Log out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#D6F6EB',
  },
  button: {
    backgroundColor: '#F0FDF8',
    width: '80%',
    borderRadius: 25,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
