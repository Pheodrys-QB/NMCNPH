import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

class Holder extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('AppStack');
    }, 2000);
  }
  render() {
    return (
      <View
        style={{backgroundColor: '#F5F5F5', alignItems:'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size={'large'} color={'blue'} style={{margin: 10}} />
      </View>
    );
  }
}

export default Holder;
