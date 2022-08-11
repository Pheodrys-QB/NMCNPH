import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const WalletTab = ({data, index, onDelete = () => {}, onSelect = () => {}}) => {
  const rightSwipe = () => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => onDelete(index)}>
        <View style={styles.deleteBox}>
          <Text style={{fontWeight:'bold', color:'#fff'}}>Delete</Text>
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
            <Text style={styles.itemText}>
              {data.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Text>{data.amount} đ</Text>
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
  itemText: {fontSize: 18, color:'#000000', fontWeight:'bold'},
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height:55,
  },
});
