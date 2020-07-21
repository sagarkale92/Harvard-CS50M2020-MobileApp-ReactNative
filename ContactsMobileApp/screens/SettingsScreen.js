import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-settings`}
        size={25}
        color={tintColor}
      />
    )
  };

  render() {
    console.log(Ionicons);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings coming soon</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  text: {
    textAlign: 'center'
  }
});
