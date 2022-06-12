import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Dropdown from '../components/Dropdown';

const test = [
  {
    catergory: 'food',
  },
  {
    catergory: 'drink',
  },
  {
    catergory: 'transport',
  },
  {
    catergory: 'housing',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
  {
    catergory: 'food',
  },
];

const AddScreen = () => {
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedWal, setSelectedWal] = useState(null);

  const onSelectCatergory = item => {
    setSelectedCat(item);
  };
  const onSelectWallet = item => {
    setSelectedWal(item);
  };

  const dummy = () => {
    console.log('button');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTop}>
        <Text style={styles.sectionTitle}>Add transaction</Text>
      </View>
      <View style={styles.Wrapper}>
        <View style={{paddingTop: 50}}>
          <View style={styles.inputWrapper}>
            <Text style={{paddingTop: 10}}>Amount: </Text>
            <TextInput
              placeholder="Input money"
              style={styles.moneyInput}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.inputWrapper} height={60}>
            <Text style={{paddingTop: 10}}>Note: </Text>
            <TextInput
              placeholder="Optional note"
              style={styles.noteInput}
              multiline={true}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Date: </Text>
            <Text>DATETIMEPICKER</Text>
          </View>
        </View>

        <TouchableHighlight
          onPress={() => dummy()}
          style={styles.buttonView}
          underlayColor="#fff">
          <View style={styles.button}>
            <Text>Add</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.dropdownBar}>
        <View style={{flexDirection: 'row'}}>
          <Text>Catergory: </Text>
          <Dropdown
            value={selectedCat}
            data={test}
            onSelect={onSelectCatergory}
          />
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 20}}>
          <Text>Wallet: </Text>
          <Dropdown value={selectedWal} data={test} onSelect={onSelectWallet} />
        </View>
      </View>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#68a0cf',
    padding: 10,
    borderRadius: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleTop: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ff7f50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper: {
    paddingTop: 30,
  },
  dropdownBar: {
    position: 'absolute',
    alignItems: 'baseline',
    paddingHorizontal: 30,
    paddingBottom: 10,
    top: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    paddingTop: 10,
    marginHorizontal: 90,
    //position: 'absolute',
  },
  moneyInput: {
    height: 40,
    borderWidth: 1,
    flex: 1,
    textAlignVertical: 'top',
  },
  noteInput: {
    textAlignVertical: 'top',
    borderWidth: 1,
    flex: 1,
    height: 40,
  },
});
