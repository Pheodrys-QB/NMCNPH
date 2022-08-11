import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
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
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import {createIconSet} from 'react-native-vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const TransactionScreen = () => {
  const [transactionList, setTransactionList] = useState([]);
  const user = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [show, setShow] = useState(false);
  const [wallet, setWallet] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
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
    getData(formatted);
  }, [date]);

  const getWallet = async (res) => {
    const docRef = doc(db, 'users', user.uid, 'Wallets', res)
    const walletData = await getDoc(docRef);
    console.log(walletData.data())
    setWallet(walletData.data());
  };

  const getData = async timeText => {
    if (user) {
      let res = await AsyncStorage.getItem('StoredID');
      console.log(res);
      getWallet(res)

      const newDate = Timestamp.fromDate(new Date(timeText));
      const transCol = collection(db, 'users', user.uid, 'Transactions');
      const q = query(
        transCol,
        where('date', '==', newDate),
        where('walletID', '==', res),
      );

      try {
        const transSnapshot = await getDocs(q);
        transSnapshot.forEach(doc => {
          console.log(doc.data());
        });
        const list = transSnapshot.docs.map(x => x.data());
        setTransactionList(list);
      } catch (err) {
        console.log(err);
        console.log('what');
      }
    }
  };

  const onDelete = async index => {
    // Delete from database
    await deleteDoc(
      doc(db, 'users', user.uid, 'Transactions', transactionList[index].id),
    );
    setTransactionList(current => current.filter((item, i) => i !== index));
    console.log('delete' + index.toString());
  };

  function renderHeader() {
    return (
      <View style>
        <View
          style={{
            paddingTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 19,
              fontWeight: '700',
            }}>
            {wallet ? wallet.amount + ' đ' : 'No wallet selected'}
          </Text>
        </View>
        <View style={styles.textBalance}>
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Account Balance
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/iconCalendar.png')}
            style={{width: 25, height: 25}}></Image>
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
        <View style={{height: 20}}></View>
        <View style={styles.box}>
          <View
            style={{
              height: 20,
              backgroundColor: '#D6F6EB',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}></View>
          <FlatList
            data={transactionList}
            renderItem={({item, index}) => {
              return <TransTab data={item} onDelete={onDelete} index={index} />;
            }}
          />
        </View>
        {/* <View style={styles.button}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
            View Report
          </Text>
        </View> */}
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
      </View>

      {/*header section: calendar*/}
      {renderHeader()}
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  textBalance: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCalendar: {
    paddingTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

  titleTop: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#CB2635',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',

    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#D6F6EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: height * 0.55,
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#D6F6EB',
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    top: 20,
    alignItems: 'center',
    width: 200,
    backgroundColor: '#FBAA60',
    padding: 10,
    borderRadius: 25,
  },
});
