import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const WalletTab = ({data, index, onDelete = () => {}, onSelect = () => {}}) => {
  const rightSwipe = () => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => onDelete(index)}>
        <View style={styles.deleteBox}>
          <Text>Delete</Text>
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
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            onSelect(index)
          }}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText}>
              {data.name}, {data.id}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text>{data.amount}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default WalletTab;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    //borderRadius: 10,
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
  itemText: {fontSize: 18},
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 90,
  },
});
