import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
  } from 'react-native';

  const test = [
  ];

  const SavingScreen = () => {
    return (
      <View style={styles.container}>

        <View style={styles.titleTop}>
          <Text style={styles.sectionTitle}>Savings</Text>
        </View>
        <View style={styles.total}>
          <Text>SAVE</Text>
        </View>

        <TextInput
              placeholder="Input saving plan"
              keyboardType="decimal-pad"
            />
        <View style={{padding: 0.5, backgroundColor: '#000000'}}/>
        <TextInput
              placeholder="Input mount of money"
              keyboardType="decimal-pad"
            />
        <View style={{padding: 0.5, backgroundColor: '#000000'}}/>
        <TextInput
              placeholder="Input due date"
              keyboardType="decimal-pad"
            />

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
                    >
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

  export default SavingScreen;

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
   
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
  
  },
  titleTop: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ff7f50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

  