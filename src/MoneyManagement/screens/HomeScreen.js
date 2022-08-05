import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TransTab from '../components/TransactionTab';

import {db} from '../firebase-config';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const [showWallet, setShowWallet] = useState(false);

  const [showTransactions, setShowTransactions] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.titleTop}></View>
      <View style={styles.balance}></View>

      <View style={{width: '100%', flex: 1}}>
        <ScrollView
          contentContainerStyle={{alignItems: 'center', paddingTop: 20}}>
          <View style={{width: '80%'}}>
            <View style={styles.box}>
              {showWallet && (
                <TouchableOpacity
                  onPress={() => {
                    setShowWallet(!showWallet);
                  }}>
                  <View style={styles.drop}>
                    <Text style={{fontSize: 20}}>My wallets</Text>
                    <Text style={{fontSize: 20}}>^</Text>
                  </View>
                </TouchableOpacity>
              )}
              {!showWallet && (
                <TouchableOpacity
                  onPress={() => {
                    setShowWallet(!showWallet);
                  }}>
                  <View style={styles.drop}>
                    <Text style={{fontSize: 20}}>My wallets</Text>
                    <Text style={{fontSize: 20}}>v</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={{height: 20}}></View>
          <View style={{width: '80%'}}>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => {
                  setShowTransactions(!showTransactions);
                }}>
                <View style={styles.dropbefore}>
                  <Text style={{fontSize: 20}}>Recent transactions</Text>
                  <Text style={{fontSize: 20}}>See details</Text>
                </View>
              </TouchableOpacity>
              {showTransactions && <Text>Wallet data</Text>}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    alignItems: 'center',
  },
  titleTop: {
    position: 'absolute',
    height: 120,
    backgroundColor: '#CB2635',
    width: '100%',
  },
  balance: {
    borderRadius: 35,
    height: 100,
    backgroundColor: '#CB2635',
    width: '80%',
  },
  box: {
    alignSelf: 'stretch',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  drop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#CB2635',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  dropbefore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#CB2635',
    borderRadius: 25,
  },
});
