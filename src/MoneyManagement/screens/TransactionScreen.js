import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Touchable,
  Dimensions,
  Image,
} from 'react-native';
import TransTab from '../components/TransactionTab';
import {db} from '../firebase-config';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import {createIconSet} from 'react-native-vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');
const TransactionScreen = () => {
  const [transactionList, setTransactionList] = useState([]);
  const user = useContext(AuthContext);

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
        setTransactionList(list);
      } catch (err) {
        console.log(err);
        console.log('what');
      }
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (user) {
  //       getData();
  //       console.log('focus');
  //       console.log(user.uid);
  //     }
  //   }, []),
  // );

  const onDelete = async index => {
    // Delete from database
    await deleteDoc(
      doc(db, 'users', user.uid, 'Transactions', transactionList[index].id),
    );
    setTransactionList(current =>
      current.filter((item, i) => i !== index),
    );
    console.log('delete' + index.toString());
  };

  function renderHeader() {
    return (
      <View style>
        <View
          style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 19,
              fontWeight: '700',
            }}>
            $14444
          </Text>
        </View>
        <View style={styles.textBalance}>
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
            }}>
            Account Balance
          </Text>
        </View>
        <Image
          source={require('../assets/iconCalendar.png')}
          style={{width: 25, height: 25}}></Image>
        <View>
          <View style={styles.textCalendar}>
            <Text
              style={{
                color: '#000000',
                fontSize: 14,
              }}>
              13 Feb, 2022
            </Text>
          </View>
        </View>
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

      <FlatList
        data={transactionList}
        renderItem={({item, index}) => {
          return <TransTab data={item} onDelete={onDelete} index={index} />;
        }}
      />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  textBalance: {
    paddingTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
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
  },

  titleTop: {
    //<<<<<<< Updated upstream
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#CB2635',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //=======
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#D6F6EB',
    justifyContent: 'center',
    alignItems: 'center',
    //>>>>>>> Stashed changes
  },
});
