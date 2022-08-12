import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import {db} from '../firebase-config';
import {
  doc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const test = [
  {
    id: '0',
    title: 'For new car',
    goal: 10000,
    current: 100,
  },
  {
    id: '1',

    title: 'For new bike',
    goal: 10000,
    current: 100,
  },
  {
    id: '2',

    title: 'For new iPhone',
    goal: 10000,
    current: 100,
  },
  {
    id: '3',

    title: 'For new demon',
    goal: 10000,
    current: 100,
  },
];

const {width, height} = Dimensions.get('window');

const SavingScreen = () => {
  const user = useContext(AuthContext);

  const [savingList, setSavingList] = useState([]);
  const [idx, setIdx] = useState(null);
  const [title, setTitle] = useState(null);
  const [goal, setGoal] = useState(null);

  const [show, setShow] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [money, setMoney] = useState(null);
  const [mode, setMode] = useState(null);
  const [wallet, setWallet] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getWallet();
      console.log('saving');
    }, []),
  );

  useEffect(() => {
    getSavings();
  }, []);

  const getWallet = async () => {
    let temp = await AsyncStorage.getItem('StoredID');
    if (temp) {
      const walletRef = doc(db, 'users', user.uid, 'Wallets', temp);
      let walletSnap = await getDoc(walletRef);
      setWallet(walletSnap.data());
      console.log(temp);

      console.log(walletSnap.data());
    }
  };

  const getSavings = async () => {
    if (user) {
      const savingCol = collection(db, 'users', user.uid, 'Savings');
      const SaveSnapshot = await getDocs(savingCol);
      let list = SaveSnapshot.docs.map(x => x.data());
      setSavingList([...list]);
    }
  };

  const OnChangeAmount = async () => {
    if (user && wallet) {
      const saving = savingList[idx];
      const savecurr = saving.current
      const docRef = doc(db, 'users', user.uid, 'Savings', saving.id);
      let t = parseInt(money);
      if (mode == 1) {
        let toGoal = saving.goal - saving.current;

        if (toGoal < t) {
          let extra = t - toGoal;
          let list = savingList;
          list[idx].current = saving.goal;
          setSavingList([...list]);
          const walletDoc = doc(db, 'users', user.uid, 'Wallets', wallet.id);
          await updateDoc(walletDoc, {amount: wallet.amount - toGoal});
          await updateDoc(docRef, {current: saving.goal});
        } else {
          let list = savingList;
          list[idx].current = saving.current + t;
          setSavingList([...list]);
          const walletDoc = doc(db, 'users', user.uid, 'Wallets', wallet.id);
          await updateDoc(walletDoc, {amount: wallet.amount - t});
          await updateDoc(docRef, {current: savecurr + t});

        }
      } else {
        let toEnd = saving.current;
        if (toEnd < t) {
          let list = savingList;
          list[idx].current = 0;
          setSavingList([...list]);

          const walletDoc = doc(db, 'users', user.uid, 'Wallets', wallet.id);
          await updateDoc(walletDoc, {amount: wallet.amount + toEnd});
          await updateDoc(docRef, {current: 0});
        } else {
          let list = savingList;
          list[idx].current = saving.current - t;
          setSavingList([...list]);

          const walletDoc = doc(db, 'users', user.uid, 'Wallets', wallet.id);
          await updateDoc(walletDoc, {amount: wallet.amount + t});
          await updateDoc(docRef, {current: savecurr - t});
        }
      }
      setMoney(null);
      setShowMoney(false);
      setShow(false);
    }
  };

  const createSaving = async () => {
    if (user) {
      if (!title || !goal) {
        return;
      }
      const colRef = collection(db, 'users', user.uid, 'Savings');
      const docRef = doc(colRef);

      try {
        let data = {
          id: docRef.id,
          title: title,
          goal: parseInt(goal),
          current: 0,
        };
        await setDoc(docRef, data);
        setSavingList([...savingList, data]);
        console.log('done creating');
      } catch (err) {
        console.log(err);
      }
      setTitle(null);
      setGoal(null);
      setShowCreate(false);
      setShow(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <View></View>
        <Text style={[styles.sectionTitle, {color: '#000000'}]}>Saving</Text>
      </View>
      <View style={{height: 20}}></View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {savingList.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.box}>
                <View style={styles.itemTitle}>
                  <Text style={styles.nameSaving}>{item.title}</Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: 70}}>
                      <Text style={{fontSize: 18, color: '#000000'}}>Goal</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 25,
                        color: '#000000',
                        fontWeight: 'bold',
                      }}>
                      {item.goal} đ
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: 70}}>
                      <Text style={{fontSize: 18, color: '#000000'}}>
                        Current
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 25,
                        color: '#000000',
                        fontWeight: 'bold',
                      }}>
                      {item.current} đ
                    </Text>
                  </View>
                </View>
                <View style={{height: 10}}></View>

                <View style={styles.itemTitle2}>
                  <TouchableOpacity
                    onPress={() => {
                      setIdx(index);
                      setMode(1);
                      setShowMoney(true);
                      setShow(true);
                    }}>
                    <View>
                      <Text style={styles.nameSaving}>Deposit</Text>
                    </View>
                  </TouchableOpacity>
                  <View></View>
                  <TouchableOpacity
                    onPress={() => {
                      setIdx(index);
                      setMode(2);
                      setShowMoney(true);
                      setShow(true);
                    }}>
                    <View>
                      <Text style={styles.nameSaving}>Withdraw</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{height: 20}}></View>
            </View>
          );
        })}

        <View style={{height: 20}}></View>

        <TouchableOpacity
          onPress={() => {
            setShowCreate(true);
            setShow(true);
          }}>
          <View style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 40}}></View>
      </ScrollView>

      {show && (
        <View style={[styles.create, {width: width, height: height}]}>
          <TouchableOpacity
            onPress={() => {
              setShow(false);
              setShowCreate(false);
              setShowMoney(false);
              setMoney(null);
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
                    New Saving
                  </Text>
                </View>
                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Title
                    </Text>
                    <TextInput
                      placeholder="Input title"
                      onChangeText={setTitle}
                      style={styles.noteInput}
                      value={title}
                    />
                  </View>
                  <View style={{height: 30}}></View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Goal
                    </Text>
                    <TextInput
                      placeholder="Input goal"
                      onChangeText={setGoal}
                      value={goal}
                      style={styles.noteInput}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
                <View style={{paddingHorizontal: 60, paddingTop: 50}}>
                  <Button title={'Create'} onPress={createSaving} />
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
                    {mode == 1 ? 'Deposit' : 'Withdraw'}
                  </Text>
                </View>
                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#000000',
                        paddingRight: 10,
                        paddingTop: 15,
                      }}>
                      Money
                    </Text>
                    <TextInput
                      placeholder="Input money"
                      onChangeText={setMoney}
                      value={money}
                      style={styles.noteInput}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
                <View style={{paddingHorizontal: 60, paddingTop: 50}}>
                  <Button title={mode == 1 ? 'Deposit' : 'Withdraw'} onPress={OnChangeAmount}/>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default SavingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },

  nameSaving: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  box: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#F0FDF8',
    alignSelf: 'center',
  },
  titleTop: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#D6F6EB',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: '#FBAA60',
    padding: 10,
    borderRadius: 25,
  },
  itemTitle: {
    paddingLeft: 20,
    backgroundColor: '#D6F6EB',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  itemTitle2: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#D6F6EB',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
  crt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#D6F6EB',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
