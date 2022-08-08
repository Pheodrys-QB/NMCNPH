import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  FlatList,
} from 'react-native';
import TransTab from '../components/TransactionTab';

import {db} from '../firebase-config';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import WalletTab from '../components/WalletTab';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const WalletTest = [
    {
      name: 'name',
      id: '1',
      amount: '10000',
    },
    {
      name: 'name',
      id: '2',
      amount: '10000',
    },
    {
      name: 'name',
      id: '3',
      amount: '10000',
    },
    {
      name: 'name',
      id: '4',
      amount: '10000',
    },
    {
      name: 'name',
      id: '5',
      amount: '10000',
    },
  ];

  const user = useContext(AuthContext);

  const [showWallet, setShowWallet] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [activeWallet, setActiveWallet] = useState('stored id');
  const [curwallet, setCurWallet] = useState('{wallet.name}');
  const [walletList, setWalletList] = useState([]);

  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);

  const [newWallet, setNewWallet] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setWalletList([...WalletTest]);
      console.log('home');
    }, []),
  );

  const handleAddWallet = () => {};

  const dummy = () => {};

  const fetchWallet = async () => {
    if (user) {
      try {
        const transSnapshot = await getDocs(
          collection(db, 'users', user.uid, 'Wallets'),
        );
        transSnapshot.forEach(doc => {
          console.log(doc.data());
        });
        const list = transSnapshot.docs.map(x => x.data());
        setWalletList(list);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getData = async () => {
    if (user) {
      try {
        const transSnapshot = await getDocs(
          collection(db, 'users', user.uid, 'Transactions'),
        );
        transSnapshot.forEach(doc => {
          console.log(doc.data());
        });
        const list = transSnapshot.docs.map(x => x.data());
        setWalletList(list);
      } catch (err) {
        console.log(err);
        console.log('what');
      }
    }
  };

  const createWallet = async () => {
    if (!name || !amount) {
      return;
    }
    const colRef = collection(db, 'users', user.uid, 'Wallets');
    const docRef = doc(colRef);

    try {
      await setDoc(docRef, {
        id: docRef.id,
        name: name,
        amount: amount,
      });
      console.log('done');
    } catch (err) {
      console.log(err);
    }
    setAmount(null);
    setName(null);
    setShowCreate(false);
  };

  const onDelete = async index => {
    // Delete from database
    // await deleteDoc(
    //   doc(db, 'users', user.uid, 'Wallets', walletList[index].id),
    // );
    setWalletList(current => current.filter((item, i) => i !== index));
    console.log('delete' + index.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}></View>
      <View style={styles.balance}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000'}}>
          {curwallet} đ
        </Text>
        <Text style={{color: '#000000'}}>Account balance: {curwallet}</Text>
      </View>

      <View style={{width: '100%', flex: 1}}>
        <ScrollView
          contentContainerStyle={{alignItems: 'center', paddingTop: 10}}>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={styles.customize}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: '#000000'}}>
                Add money
              </Text>
            </View>
            <View style={styles.customize}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: '#000000'}}>
                Rename
              </Text>
            </View>
          </View>
          <View style={{height: 20}}></View>

          <View style={{width: '80%'}}>
            {showWallet && (
              <View style={styles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setShowWallet(!showWallet);
                  }}>
                  <View style={styles.drop}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      My wallets
                    </Text>
                    <Text style={{fontSize: 20, color: '#000000'}}>Close</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  {walletList.map((item, index) => {
                    return (
                      <View key={index}>
                        <WalletTab
                          data={item}
                          onDelete={onDelete}
                          index={index}
                        />
                      </View>
                    );
                  })}
                  <View
                    style={{
                      borderColor: '#000',
                      borderBottomWidth: 0.5,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => {
                      setShowCreate(true);
                    }}>
                    <View
                      style={{
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#F0FDF8',
                        borderBottomRightRadius: 25,
                        borderBottomLeftRadius: 25,
                      }}>
                      <Text style={{color: '#000000'}}>Add...</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {!showWallet && (
              <View style={styles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setShowWallet(!showWallet);
                  }}>
                  <View style={styles.dropbefore}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      My wallets
                    </Text>
                    <Text style={{fontSize: 20, color: '#000000'}}>Expand</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{height: 20}}></View>
          <View style={{width: '80%'}}>
            {showTransactions && (
              <View style={styles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setShowTransactions(!showTransactions);
                  }}>
                  <View style={styles.drop}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      Recent transactions
                    </Text>
                    <Text style={{fontSize: 20, color: '#000000'}}>Close</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                </View>
              </View>
            )}
            {!showTransactions && (
              <View style={styles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setShowTransactions(!showTransactions);
                  }}>
                  <View style={styles.drop}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      Recent transactions
                    </Text>
                    <Text style={{fontSize: 20, color: '#000000'}}>
                      See details
                    </Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>1</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={{height: 50}}></View>

          <TouchableHighlight
            onPress={dummy}
            style={styles.buttonView}
            underlayColor="#fff">
            <View style={styles.button}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                See today report
              </Text>
            </View>
          </TouchableHighlight>
          <View style={{height: 100}}></View>
        </ScrollView>
      </View>

      {showCreate && (
        <View style={[styles.create, {width: width, height: height}]}>
          <TouchableOpacity
            onPress={() => {
              setShowCreate(false);
              setName(null);
              setAmount(null);
            }}>
            <View style={styles.createContainer}></View>
          </TouchableOpacity>
          <View style={styles.createPrompt}>
            <Text>New Wallet</Text>
            <View>
              <Text>Name</Text>
            </View>
            <View>
              <Text>Money</Text>
            </View>
            <View>
              <Text>cancel + create</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 70,
    alignItems: 'center',
  },
  titleTop: {
    position: 'absolute',
    height: 120,
    backgroundColor: '#D6F6EB',
    width: '100%',
  },
  balance: {
    borderRadius: 35,
    height: 100,
    backgroundColor: '#F0FDF8',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 50,
  },
  box: {
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  drop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#D6F6EB',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  dropbefore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#D6F6EB',
    borderRadius: 25,
  },
  customize: {
    borderRadius: 25,
    backgroundColor: '#D6F6EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  buttonView: {
    paddingTop: 10,
    width: '60%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FBAA60',
    padding: 10,
    borderRadius: 25,
  },
  create: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  createContainer: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  createPrompt: {
    position: 'absolute',
    width: '80%',
    height: 300,
    backgroundColor: '#F5F5F5',
    left: width * 0.1,
    top: height / 4,
    borderRadius: 25,
  },
});
