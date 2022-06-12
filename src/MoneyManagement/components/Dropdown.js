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

  const onPressAction = (item) =>{
    onSelect(item)
    setShow(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() => setShow(!Show)}>
        <Text>{value}</Text>
      </TouchableOpacity>
      {Show && (
        <View style={{maxHeight: 200}}>
          <ScrollView>
            {data.map((val, index) => {
              return (
                <TouchableOpacity onPress={()=>onPressAction(val.catergory)}>
                  <Text key={index}>{val.catergory}</Text>
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
    backgroundColor: '#dcdcdc',
    width: '100%',
    //shadowColor: '#000000',
    // shadowRadius: 4,
    // shadowOffset: {height: 4, width: 0},
    // shadowOpacity: 0.5,
  },
  container: {
    backgroundColor: '#dcdcdc',
    width: 100,
  },
});
