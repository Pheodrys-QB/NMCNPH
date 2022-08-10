import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Button,
    Dimensions,
  } from 'react-native';

  const test = [
  ];

  const SavingScreen = () => {
    return (
      <View style={styles.container}>

        <View style={styles.titleTop}>
          <Text style={styles.sectionTitle}>Savings</Text>
        </View>

        <View style={{height: 35}}></View>

        <View style={styles.box}>
          <Text style={styles.nameSaving}>Name</Text>
          <View style={{left: 30, width: 250, top: 17, padding: 0.5, backgroundColor: '#000000'}}></View>
        </View>

        <View style={{height: 130}}></View>

        <View style={styles.button}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
            Add
          </Text>
        </View>
        
      </View>
      
      
    );
  };

  export default SavingScreen;

const styles = StyleSheet.create({
  total:{
    backgroundColor:'#F5F5F5',
    paddingBottom: 10,
    paddingRight: 30,
    alignContent:'center', 
    alignItems:'flex-end'
  },
  flowBar:{
    backgroundColor:'#FBAA60',
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  nameSaving: {
    paddingTop: 20,
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box:{
    height: 217,
    width: 310,
    borderRadius: 25,
    backgroundColor: '#D6F6EB',
    alignSelf: 'center',
   
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
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: '#FBAA60',
    padding: 10,
    borderRadius: 25,
  },
});

  