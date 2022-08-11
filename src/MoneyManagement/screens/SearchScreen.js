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
import Dropdown from '../components/Dropdown';

const {width, height} = Dimensions.get('window');
const CATERGORY = [
  {
    name: 'Food',
  },
  {
    name: 'Drink',
  },
  {
    name: 'Transport',
  },
  {
    name: 'Housing',
  },
];

const SearchScreen = ({navigation}) => {
  const [transactionList, setTransactionList] = useState([]);
  const user = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [date2, setDate2] = useState(new Date());
  const [dateText2, setDateText2] = useState('');

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(null);

  const [showSearch, setShowSearch] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const [showDate, setShowDate] = useState(false);
  const [showCat, setShowCat] = useState(false);

  const onSelectCatergory = item => {
    setSelectedCat(item);
  };

  const onChangeDate = (event, selectedDate) => {
    if (mode == 1) {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (currentDate > date2) {
        setDate2(currentDate);
      }
    } else {
      const currentDate = selectedDate || date2;
      setDate2(currentDate);

      if (currentDate < date) {
        setDate(currentDate);
      }
    }

    setShow(false);
  };

  useEffect(() => {
    let d = date;
    let fYear = d.getFullYear();
    let fMonth = d.getMonth() + 1;
    let fDate = d.getDate();
    if (fMonth < 10) {
      fMonth = '0' + fMonth;
    }
    if (fDate < 10) {
      fDate = '0' + fDate;
    }
    let formatted = fYear + '-' + fMonth + '-' + fDate;
    setDateText(formatted);
  }, [date]);

  useEffect(() => {
    let d = date2;
    let fYear = d.getFullYear();
    let fMonth = d.getMonth() + 1;
    let fDate = d.getDate();
    if (fMonth < 10) {
      fMonth = '0' + fMonth;
    }
    if (fDate < 10) {
      fDate = '0' + fDate;
    }
    let formatted = fYear + '-' + fMonth + '-' + fDate;
    setDateText2(formatted);
  }, [date2]);

  const getData = async () => {
    if (user) {
      let res = await AsyncStorage.getItem('StoredID');
      console.log(res, dateText, dateText2, selectedCat?.name);
      if (!res) {
        return;
      }

      const fromDate = Timestamp.fromDate(new Date(dateText));
      const toDate = Timestamp.fromDate(new Date(dateText2));
      let q = collection(db, 'users', user.uid, 'Transactions');

      if (showDate) {
        q = query(
          q,
          where('date', '<=', toDate),
          where('date', '>=', fromDate),
        );
      }
      if (showCat) {
        if (!selectedCat) {
          return;
        }
        q = query(q, where('catergory', '==', selectedCat.name));
      }
      q = query(q, where('walletID', '==', res));

      try {
        const transSnapshot = await getDocs(q);
        transSnapshot.forEach(doc => {
          console.log(doc.data());
        });
        const list = transSnapshot.docs.map(x => x.data());
        setTransactionList(list);
      } catch (err) {
        console.log(err);
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

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <View></View>
        <Text style={[styles.sectionTitle, {color: '#000000'}]}>
          Search Transaction
        </Text>
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={{height: 50, backgroundColor: '#f5f5f5'}}>
          {!showSearch && (
            <TouchableOpacity
              onPress={() => {
                setShowSearch(!showSearch);
              }}>
              <View style={styles.drop}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Filter</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{width: width * 0.8, height:height*0.65, backgroundColor:'#fff'}}>
          <View
            style={{
              width: '100%',
              height: 20,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              backgroundColor: '#D6F6EB',
            }}></View>
          <FlatList
            data={transactionList}
            renderItem={({item, index}) => {
              return <TransTab data={item} onDelete={onDelete} index={index} />;
            }}
          />
          <View
            style={{
              width: '100%',
              height: 20,
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              backgroundColor: '#D6F6EB',
            }}></View>
        </View>
      </View>

      {showSearch && (
        <View style={styles.drop2}>
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <TouchableOpacity
              onPress={() => {
                setShowDate(!showDate);
              }}>
              <View
                style={[
                  styles.button2,
                  {backgroundColor: showDate ? '#FBAA60' : '#dcdcdc'},
                ]}>
                <Text>Date</Text>
              </View>
            </TouchableOpacity>
            <View style={{width: 50}}></View>
            <TouchableOpacity
              onPress={() => {
                setShowCat(!showCat);
              }}>
              <View
                style={[
                  styles.button2,
                  {backgroundColor: showCat ? '#FBAA60' : '#dcdcdc'},
                ]}>
                <Text>Catergory</Text>
              </View>
            </TouchableOpacity>
          </View>

          {showDate && (
            <View style={{paddingVertical: 10}}>
              <View style={styles.dateline}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#000000',
                  }}>
                  From
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMode(1);
                    setShow(true);
                  }}>
                  <View style={{width: width * 0.23, justifyContent: 'center'}}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 15,
                        color: '#000000',
                      }}>
                      {dateText}
                    </Text>
                    <View
                      style={{borderColor: '#000', borderWidth: 0.5}}></View>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#000000',
                  }}>
                  To
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMode(2);
                    setShow(true);
                  }}>
                  <View style={{width: width * 0.23, justifyContent: 'center'}}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 15,
                        color: '#000000',
                      }}>
                      {dateText2}
                    </Text>
                    <View
                      style={{borderColor: '#000', borderWidth: 0.5}}></View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showCat && <View style={{height: 50}}></View>}

          <View style={{height: 10}}></View>
          <TouchableOpacity
            onPress={() => {
              setShowSearch(false);
              getData();
            }}>
            <View style={styles.button}>
              <Text>Ok</Text>
            </View>
          </TouchableOpacity>
          <View style={{height: 10}}></View>

          <TouchableOpacity
            onPress={() => {
              setShowSearch(!showSearch);
            }}>
            <View style={styles.drop}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Close</Text>
            </View>
          </TouchableOpacity>

          {showCat && (
            <View style={[styles.dropdownBar,{top:showDate? 100: 55}]}>
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
                  data={CATERGORY}
                  onSelect={onSelectCatergory}
                />
              </View>
            </View>
          )}
        </View>
      )}
      {show && (
        <DateTimePicker
          testID="DateTimePicker"
          value={mode == 1 ? date : date2}
          mode={'date'}
          display={'default'}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default SearchScreen;

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

  titleTop: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#D6F6EB',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  drop: {
    height: 40,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#F0FDF8',
  },
  drop2: {
    position: 'absolute',
    top: 120,
    left: width * 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  dateline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width * 0.7,
  },
  dropdownBar: {
    position: 'absolute',
    left: 35,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FBAA60',
    padding: 10,
    borderRadius: 25,
    width: width / 5,
  },
  button2: {
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
