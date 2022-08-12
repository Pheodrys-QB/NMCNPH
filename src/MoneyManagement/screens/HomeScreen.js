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
  Button,
  TextInput,
} from 'react-native';

import {db} from '../firebase-config';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';

import WalletTab from '../components/WalletTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

let CATERGORY = [
  {
    name: 'Food',
    amount: 0,
  },
  {
    name: 'Drink',
    amount: 0,
  },
  {
    name: 'Transport',
    amount: 0,
  },
  {
    name: 'Housing',
    amount: 0,
  },
];

const HomeScreen = () => {
  const user = useContext(AuthContext);

  const [showWallet, setShowWallet] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  const [show, setShow] = useState(false);

  const [curwallet, setCurWallet] = useState(null);
  const [curIdx, setCurIdx] = useState(null);
  const [walletList, setWalletList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      if (curwallet) {
        getData();
        fetchWallet();
      }
      console.log('home');
      console.log(user.uid);
      return () => {
        let list = [];
        setTransactionList([...list]);
        CATERGORY.forEach(e => {
          e.amount = 0;
        });
      };
    }, []),
  );

  useEffect(() => {
    if (curwallet) {
      getData();
      console.log('item');
    }
  }, [curwallet]);

  useEffect(() => {
    fetchWallet();
  }, []);

  const updateName = async () => {
    const walletDoc = doc(db, 'users', user.uid, 'Wallets', curwallet.id);
    await updateDoc(walletDoc, {name: name});

    let temp = curwallet;
    temp.name = 'name';
    setCurWallet(temp);

    let list = walletList;
    list[curIdx].name = name;
    setWalletList([...list]);

    setShowName(false);
    setShow(false);
    setName(null);
  };

  const updateMoney = async () => {
    const walletDoc = doc(db, 'users', user.uid, 'Wallets', curwallet.id);
    let res = curwallet.amount + parseInt(amount);
    await updateDoc(walletDoc, {amount: res});

    let temp = curwallet;
    temp.amount = res;
    setCurWallet(temp);

    let list = walletList;
    list[curIdx].amount = res;
    setWalletList([...list]);

    setShowMoney(false);
    setShow(false);
    setAmount(null);
  };

  const fetchWallet = async () => {
    if (user) {
      try {
        let res = await AsyncStorage.getItem('StoredID');
        console.log('get ', res);

        const transSnapshot = await getDocs(
          collection(db, 'users', user.uid, 'Wallets'),
        );
        transSnapshot.forEach(doc => {
          console.log(doc.data());
        });
        const list = transSnapshot.docs.map(x => x.data());
        setWalletList([...list]);
        let index = list.findIndex(e => e.id == res);

        if (index != -1) {
          setCurWallet(list[index]);
          setCurIdx(index);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getData = async () => {
    if (user) {
      if (curwallet) {
        const transRef = collection(db, 'users', user.uid, 'Transactions');
        const q = query(transRef, where('walletID', '==', curwallet.id));
        try {
          const transSnapshot = await getDocs(q);
          transSnapshot.forEach(doc => {
            console.log(doc.data());
          });
          const list = transSnapshot.docs.map(x => x.data());
          CATERGORY.forEach(cat => {
            cat.amount = 0;
          });

          list.forEach(item => {
            CATERGORY.forEach(cat => {
              if (item.catergory == cat.name) {
                cat.amount = cat.amount + item.amount;
              }
            });
          });
          setTransactionList([...list]);
        } catch (err) {
          console.log(err);
        }
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
      let data = {id: docRef.id, name: name, amount: parseInt(amount)};
      await setDoc(docRef, data);
      console.log('done');
      setWalletList([...walletList, data]);
    } catch (err) {
      console.log(err);
    }
    setAmount(null);
    setName(null);
    setShowCreate(false);
    setShow(false);
  };

  const onDelete = async index => {
    // Delete from database
    await deleteDoc(
      doc(db, 'users', user.uid, 'Wallets', walletList[index].id),
    );
    let select = walletList[index];
    if (curwallet.id == select.id) {
      setCurWallet(null);
      setCurIdx(null);
      await AsyncStorage.removeItem('StoredID');
    }
    let list = walletList.filter((item, i) => i !== index);
    setWalletList([...list]);
    setTransactionList([]);
    console.log('delete' + index.toString());
  };

  const onSelect = async index => {
    let select = walletList[index];
    setCurWallet(select);
    setCurIdx(index);
    await AsyncStorage.setItem('StoredID', select.id);
    console.log('select' + index.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}></View>
      <View style={styles.balance}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000'}}>
          {curwallet ? curwallet.amount + ' đ' : 'No wallet selected'}
        </Text>
        <Text style={{color: '#000000'}}>
          Account balance: {curwallet?.name}
        </Text>
      </View>
      <View style={{height: 10}}></View>
      <View style={{width: '100%', flex: 1}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (curwallet) {
                  setShowMoney(true);
                  setShow(true);
                }
              }}>
              <View style={styles.customize}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: '#000000'}}>
                  Add money
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (curwallet) {
                  setShowName(true);
                  setShow(true);
                }
              }}>
              <View style={styles.customize}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: '#000000'}}>
                  New name
                </Text>
              </View>
            </TouchableOpacity>
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
                          onSelect={onSelect}
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
                      setShow(true);
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
                  {transactionList.map((item, index) => {
                    return (
                      <View
                        style={{paddingHorizontal: 20, paddingVertical: 10}}
                        key={index}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#000000',
                              fontWeight: 'bold',
                            }}>
                            {item.catergory}
                          </Text>
                          <Text>{item.amount} đ</Text>
                        </View>
                        <Text>Note: {item.note}</Text>
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: 20,
                    backgroundColor: '#F0FDF8',
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}></View>
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
                  {CATERGORY.map((item, index) => {
                    if (item.amount == 0) {
                      return;
                    }
                    return (
                      <View
                        key={index}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000000',
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                        <Text>{item.amount} đ</Text>
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: 20,
                    backgroundColor: '#F0FDF8',
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}></View>
              </View>
            )}
          </View>
          <View style={{height: 50}}></View>

          {/* <TouchableHighlight
            // onPress={dummy}
            style={styles.buttonView}
            underlayColor="#fff">
            <View style={styles.button}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                See today report
              </Text>
            </View>
          </TouchableHighlight>
          <View style={{height: 100}}></View> */}
        </ScrollView>
      </View>

      {show && (
        <View style={[styles.create, {width: width, height: height}]}>
          <TouchableOpacity
            onPress={() => {
              setShow(false);
              setShowCreate(false);
              setShowMoney(false);
              setShowName(false);
              setName(null);
              setAmount(null);
            }}>
            <View style={styles.createContainer}></View>
          </TouchableOpacity>
          {showCreate && (
            <View style={styles.createPrompt}>
              <ScrollView>
                <View style={styles.crt}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#000000',
                    }}>
                    New Wallet
                  </Text>
                </View>
                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Name
                    </Text>
                    <TextInput
                      placeholder="Input name"
                      onChangeText={setName}
                      style={styles.noteInput}
                      value={name}
                    />
                  </View>
                  <View style={{height: 30}}></View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Money
                    </Text>
                    <TextInput
                      placeholder="Input money"
                      onChangeText={setAmount}
                      value={amount}
                      style={styles.noteInput}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
                <View style={{paddingHorizontal: 60, paddingTop: 50}}>
                  <Button title={'Create'} onPress={createWallet} />
                </View>
              </ScrollView>
            </View>
          )}
          {showMoney && (
            <View style={styles.createPrompt2}>
              <ScrollView>
                <View style={styles.crt}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#000000',
                    }}>
                    Add Money
                  </Text>
                </View>
                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Money
                    </Text>
                    <TextInput
                      placeholder="Input money"
                      onChangeText={setAmount}
                      value={amount}
                      style={styles.noteInput}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
                <View style={{paddingHorizontal: 60, paddingTop: 50}}>
                  <Button title={'Add'} onPress={updateMoney} />
                </View>
              </ScrollView>
            </View>
          )}
          {showName && (
            <View style={styles.createPrompt2}>
              <ScrollView>
                <View style={styles.crt}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#000000',
                    }}>
                    New Name
                  </Text>
                </View>
                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Name
                    </Text>
                    <TextInput
                      placeholder="Input name"
                      onChangeText={setName}
                      style={styles.noteInput}
                      value={name}
                    />
                  </View>
                </View>
                <View style={{paddingHorizontal: 60, paddingTop: 50}}>
                  <Button title={'Update'} onPress={updateName} />
                </View>
              </ScrollView>
            </View>
          )}
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
  crt: {
    alignItems: 'center',
    justifyContent: 'center',
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
  createPrompt2: {
    position: 'absolute',
    width: '80%',
    height: 200,
    backgroundColor: '#F5F5F5',
    left: width * 0.1,
    top: height / 4,
    borderRadius: 25,
  },

  noteInput: {
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});
