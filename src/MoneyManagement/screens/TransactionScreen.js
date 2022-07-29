import React, { useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TransTab from '../components/TransactionTab';

import { db } from "../firebase-config"
import { getDocs, collection } from "firebase/firestore"
import { AuthContext } from "../navigation/AuthProvider";


const TransactionScreen = () => {
  const [transactionList, setTransactionList] = useState([])
  const user = useContext(AuthContext);

  const getData = async ()=>{
    const transCol = collection(db, 'users', user.uid, 'Transactions');
    const transSnapshot = await getDocs(transCol);
    const transList = transSnapshot.docs.map(doc => doc.data());
    setTransactionList(transList)
  }

    
  useEffect(() => {
    getData()
  }, []);

  
  
  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          
          <View style={styles.items}>
            {
              transactionList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    //onPress={() => edit(index)}
                  >
                    <TransTab data={item} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      </ScrollView>
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
