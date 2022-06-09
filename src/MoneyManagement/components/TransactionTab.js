import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransTab = (props) => {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <View style={styles.data}>
        <Text style={styles.itemText}>{props.data.catergory}</Text>
        <Text style={styles.itemText}>{props.data.note}</Text>
        <Text style={styles.itemText}>{props.data.date}</Text>

        </View>
      </View>
      <View style={styles.itemRight}>
      <Text style={styles.itemTextRight}>{props.data.amount}</Text>
      </View>
    </View>
  )
}

export default TransTab;

const styles = StyleSheet.create({
  data:{
    alignContent:'center',
    flex: 1
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    //borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '80%'
  },
  itemRight: {
    alignItems: 'center',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
});


