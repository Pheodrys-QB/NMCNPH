import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TransTab from '../components/TransactionTab';

const test = [
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
  {
    id: 'id',
    catergory: 'catergory',
    date: 'date',
    amount: 'amount',
    note: 'extra note',
  },
];

const TransactionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
      </View>
      <View style={styles.flowBar}>
        <View style={styles.itemLeft}>
           <Text>Inflow: </Text>
           <Text>Outflow: </Text>
        </View>  
        <View style={styles.itemRight}>
           <Text>GAIN</Text>
           <Text>LOST</Text>
        </View>  
      </View>
      <View style={styles.total}>
        <Text>GAIN - LOST</Text>
      </View>
      <View style={{padding: 0.5, backgroundColor: '#000000'}}/>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.tasksWrapper}>
          
          <View style={styles.items}>
            {
              test.map((item, index) => {
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
  total:{
    backgroundColor:'#fffacd',
    paddingBottom: 10,
    paddingRight: 30,
    alignContent:'center', 
    alignItems:'flex-end'
  },
  flowBar:{
    backgroundColor:'#fffacd',
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ff7f50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
