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
    name: 'bb',
    id: '45',
  },
  {
    name: 'ab',
    id: '12',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'bb',
    id: '45',
  },
  {
    name: 'ab',
    id: '12',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'bb',
    id: '45',
  },
  {
    name: 'ab',
    id: '12',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'bb',
    id: '45',
  },
  {
    name: 'ab',
    id: '12',
  },
  {
    name: 'cc',
    id: '78',
  },
  {
    name: 'bb',
    id: '45',
  },
  {
    name: 'ab',
    id: '12',
  },
  {
    name: 'cc',
    id: '78',
  },
];

const TransactionScreen = () => {
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
