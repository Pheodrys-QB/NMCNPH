import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import TransTab from '../components/TransactionTab';

import {db} from '../firebase-config';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const TransactionScreen = () => {
  const test = [
    {
      catergory: 'catergory',
      id: 'id1',
      amount: 'amount',
    },
    {
      catergory: 'catergory',
      id: 'id2',
      amount: 'amount',
    },
    {
      catergory: 'catergory',
      id: 'id3',
      amount: 'amount',
    },
    {
      catergory: 'catergory',
      id: 'id4',
      amount: 'amount',
    },
    {
      catergory: 'catergory',
      id: 'id5',
      amount: 'amount',
    },
    {
      catergory: 'catergory',
      id: 'id6',
      amount: 'amount',
    },
    {
      catergory: 'catergory',
      id: 'id7',
      amount: 'amount',
    },
  ];

  const [transactionList, setTransactionList] = useState([]);
  const user = useContext(AuthContext);

  const getData = async () => {
    setTransactionList([]);
    const transCol = collection(db, 'users', user.uid, 'Transactions');
    const transSnapshot = await getDocs(transCol);
    const transList = transSnapshot.docs.map(doc => doc.data());
    setTransactionList(transList);
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (index) => {
    // Delete from database
    await deleteDoc(doc(db, 'users', user.uid, 'Transactions', transactionList[index].id))
    setTransactionList(current => current.filter((transactionList, i) => i !== index));
    console.log('delete'+ index.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
      </View>

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
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    //paddingTop: 20,
    //paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    //marginTop: 10,
  },
  titleTop: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ff7f50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
