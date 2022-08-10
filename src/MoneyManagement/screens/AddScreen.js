import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Dropdown from '../components/Dropdown';
import {db} from '../firebase-config';
import {doc, getDocs, collection, setDoc, Timestamp} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

// import 'intl';

// import 'intl/locale-data/jsonp/en';

// const dummy = () => {
//   console.log(new Intl.NumberFormat().format(10000));
// };

const test = [
  {
    name: 'food',
  },
  {
    name: 'drink',
  },
  {
    name: 'transport',
  },
  {
    name: 'housing',
  },
];

const AddScreen = () => {
  const user = useContext(AuthContext);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedWal, setSelectedWal] = useState(null);
  const [walletList, setWalletList] = useState([]);
  const [money, setMoney] = useState(null);
  const [note, setNote] = useState(null);
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [show, setShow] = useState(false);

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
        setWalletList([...list]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (currentDate) {
      let temp = new Date(currentDate);
    }
  };

  const setData = async () => {
    if (!selectedCat || !selectedWal || !money) {
      return;
    }
    const colRef = collection(db, 'users', user.uid, 'Transactions');
    const docRef = doc(colRef);

    const newDate = Timestamp.fromDate(new Date(dateText));

    try {
      await setDoc(docRef, {
        id: docRef.id,
        catergory: selectedCat.name,
        walletID: selectedWal.id,
        amount: parseInt(money),
        note: note,
        date: newDate,
      });
      console.log('done');
    } catch (err) {
      console.log(err);
    }
    setSelectedCat(null);
    setSelectedWal(null);
    setMoney(null);
    setNote(null);
    setDate(new Date());
  };

  useFocusEffect(
    React.useCallback(() => {
      setDate(new Date());
    }, []),
  );

  useEffect(() => {
    let fYear = date.getFullYear();
    let fMonth = date.getMonth() + 1;
    let fDate = date.getDate();
    if (fMonth < 10) {
      fMonth = '0' + fMonth;
    }
    if (fDate < 10) {
      fDate = '0' + fDate;
    }
    let formatted = fYear + '-' + fMonth + '-' + fDate;
    setDateText(formatted);
  }, [date]);

  useFocusEffect(
    React.useCallback(() => {
      fetchWallet();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <View></View>
        <Text style={[styles.sectionTitle, {color: '#000000'}]}>
          Add Transaction
        </Text>
      </View>
      <ScrollView>
        <View style={styles.Wrapper}>
          <View style={{paddingTop: 40}}>
            <View style={styles.inputWrapper}>
              <View style={{paddingTop: 15, paddingRight: 10}}>
                <Image
                  source={require('../assets/money.png')}
                  style={{height: 20, width: 30, resizeMode: 'stretch'}}
                />
              </View>
              <TextInput
                placeholder="Input money"
                onChangeText={setMoney}
                value={money}
                style={styles.moneyInput}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.inputWrapper} height={60}>
              <View style={{paddingTop: 15, paddingRight: 15, paddingLeft: 5}}>
                <Image
                  source={require('../assets/note.png')}
                  style={{height: 20, width: 20, resizeMode: 'stretch'}}
                />
              </View>
              <TextInput
                placeholder="Optional note"
                onChangeText={setNote}
                value={note}
                style={styles.noteInput}
                multiline={true}
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={{paddingRight: 15, paddingLeft: 5}}>
                <Image
                  source={require('../assets/calendar.png')}
                  style={{height: 20, width: 20, resizeMode: 'stretch'}}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                }}>
                <View>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 20,
                      color: '#000000',
                    }}>
                    {dateText}
                  </Text>
                  <View style={{borderColor: '#000', borderWidth: 0.5}}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: 20}}></View>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              onPress={setData}
              style={styles.buttonView}
              underlayColor="#fff">
              <View style={styles.button}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
                  Add
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>

      <View style={styles.dropdownBar}>
        <View style={{flexDirection: 'row'}}>
          <View style={{paddingTop: 7, paddingRight: 15, paddingLeft: 5}}>
            <Image
              source={require('../assets/tag.png')}
              style={{height: 20, width: 20, resizeMode: 'stretch'}}
            />
          </View>
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
          <View style={{paddingTop: 7, paddingRight: 15}}>
            <Image
              source={require('../assets/wallet.png')}
              style={{height: 20, width: 20, resizeMode: 'stretch'}}
            />
          </View>
          <Dropdown
            key={2}
            value={selectedWal}
            data={walletList}
            onSelect={onSelectWallet}
          />
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="DateTimePicker"
          value={date}
          mode={'date'}
          display={'default'}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FBAA60',
    padding: 10,
    borderRadius: 25,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleTop: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#D6F6EB',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Wrapper: {
    paddingTop: 30,
  },
  dropdownBar: {
    position: 'absolute',
    left: 30,
    top: 150,
    flexDirection: 'row',
  },
  dropdownBar2: {
    position: 'absolute',
    left: 30,
    right: 30,
    top: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonView: {
    paddingTop: 10,
    width: '60%',
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
