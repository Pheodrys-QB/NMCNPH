import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Dropdown from '../components/Dropdown';
import {db} from '../firebase-config';
import {doc, getDocs, collection, setDoc} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {async} from '@firebase/util';
import {useFocusEffect} from '@react-navigation/native';

const test = [
  {
    catergory: 'food',
  },
  {
    catergory: 'drink',
  },
  {
    catergory: 'transport',
  },
  {
    catergory: 'housing',
  },
];

const AddScreen = () => {
  const user = useContext(AuthContext);
  const [selectedCat, setSelectedCat] = useState('Catergory v');
  const [selectedWal, setSelectedWal] = useState('Wallet v');
  const [walletList, setWalletList] = useState([]);
  const [money, setMoney] = useState(null);
  const [note, setNote] = useState(null);
  const [date, setDate] = useState(null);

  const onSelectCatergory = item => {
    setSelectedCat(item);
  };
  const onSelectWallet = item => {
    setSelectedWal(item);
  };

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
        console.log('what');
      }
    }
  };

  const setData = async () => {
    const colRef = collection(db, 'users', user.uid, 'Transactions');
    const docRef = doc(colRef);

    try {
      await setDoc(docRef, {
        id: docRef.id,
        catergory: selectedCat,
        wallet: selectedWal,
        amount: money,
        note: note,
      });
      console.log('done');
      console.log(user.uid);
    } catch (err) {
      console.log(err);
    }
    setSelectedCat(null);
    setSelectedWal(null);
    setMoney(null);
    setNote(null);
    setDate(null);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (user) {
  //       fetchWallet();
  //       console.log('focus');
  //       console.log(user.uid);
  //     }
  //   }, []),
  // );

  // useEffect(() => {
  //   if (user) {
  //     fetchWallet();
  //     console.log('with user');
  //     console.log(user.uid);
  //   }
  // }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <Text style={styles.sectionTitle}>Add transaction</Text>
      </View>
      <ScrollView>
        <View style={styles.Wrapper}>
          <View style={{paddingTop: 50}}>
            <View style={styles.inputWrapper}>
              <Text style={{fontSize: 20, paddingRight: 10}}>pic</Text>
              <TextInput
                placeholder="Input money"
                onChangeText={setMoney}
                value={money}
                style={styles.moneyInput}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.inputWrapper} height={60}>
              <Text style={{fontSize: 20, paddingRight: 10}}>pic</Text>
              <TextInput
                placeholder="Optional note"
                onChangeText={setNote}
                value={note}
                style={styles.noteInput}
                multiline={true}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={{fontSize: 20, paddingRight: 10}}>pic</Text>
              <Text>DATETIMEPICKER</Text>
            </View>
          </View>

          <TouchableHighlight
            onPress={setData}
            style={styles.buttonView}
            underlayColor="#fff">
            <View style={styles.button}>
              <Text>Add</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>

      <View style={styles.dropdownBar}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20, paddingRight: 10}}>pic</Text>
          <Dropdown
            key={1}
            value={selectedCat}
            data={test}
            onSelect={onSelectCatergory}
          />
        </View>
      </View>
      <View style={styles.dropdownBar2}>
        <View></View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20, paddingRight: 10}}>pic</Text>
          <Dropdown
            key={2}
            value={selectedWal}
            data={test}
            onSelect={onSelectWallet}
          />
        </View>
      </View>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#68a0cf',
    padding: 10,
    borderRadius: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleTop: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#CB2635',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper: {
    paddingTop: 20,
  },
  dropdownBar: {
    position: 'absolute',
    left: 30,
    right: 30,
    top: 100,
    flexDirection: 'row',
  },
  dropdownBar2: {
    position: 'absolute',
    left: 30,
    right: 30,
    top: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonView: {
    paddingTop: 10,
    marginHorizontal: 90,
    //position: 'absolute',
  },
  moneyInput: {
    height: 40,
    borderBottomWidth: 1,
    flex: 1,
    textAlignVertical: 'top',
  },
  noteInput: {
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    flex: 1,
    height: 40,
  },
  scrollViewStyle: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
