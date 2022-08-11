import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Dropdown = ({value, data, onSelect = () => {}}) => {
  const [Show, setShow] = useState(false);

  const onPressAction = item => {
    onSelect(item);
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() => setShow(!Show)}>
        <Text style={{fontSize:15}}>{value? value.name: "Select"}</Text>
      </TouchableOpacity>
      {Show && (
        <View style={{maxHeight: 200, backgroundColor:'#fff'}}>
          <ScrollView>
            {data.map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onPressAction(val)}>
                  <Text style={{fontSize: 15}}>{val.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    paddingTop:5,
    backgroundColor: '#fff',
    width: '100%',
    //shadowColor: '#000000',
    // shadowRadius: 4,
    // shadowOffset: {height: 4, width: 0},
    // shadowOpacity: 0.5,
  },
  container: {
    backgroundColor: '#000',
    width: 125,
  },
});
