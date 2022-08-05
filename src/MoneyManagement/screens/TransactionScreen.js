import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import TransTab from '../components/TransactionTab';

import {db} from '../firebase-config';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';

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

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        getData();
        console.log('focus');
        console.log(user.uid)

      }
    }, []),
  );


  const onDelete = async index => {
    // Delete from database
    await deleteDoc(
      doc(db, 'users', user.uid, 'Transactions', transactionList[index].id),
    );
    setTransactionList(current =>
      current.filter((transactionList, i) => i !== index),
    );
    console.log('delete' + index.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <View></View>
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

  sectionTitle: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },

  titleTop: {
    paddingVertical:20,
    paddingHorizontal:20,
    backgroundColor: '#CB2635',
    height: 120,
    flexDirection:'column',
    justifyContent:'space-between'
  },
});
