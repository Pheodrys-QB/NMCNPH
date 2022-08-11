import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const TransTab = ({data, index, onDelete = () => {}}) => {
  const rightSwipe = () => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => onDelete(index)}>
        <View style={styles.deleteBox}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={rightSwipe}
        overshootRight={false}
        key={data.id}>
        <View style={styles.item}>
          <View style={styles.top}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>{data.catergory}</Text>
            </View>
            <View style={styles.itemRight}>
              <Text>{data.amount} đ</Text>
            </View>
          </View>
          <View>
            <Text>Note: {data.note}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default TransTab;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    //borderRadius: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#CB2635',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {fontSize: 18, color: '#000000', fontWeight: 'bold'},
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 75,
  },
});
