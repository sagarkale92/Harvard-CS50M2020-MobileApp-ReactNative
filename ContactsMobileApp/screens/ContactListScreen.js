import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

import ContactList from '../ContactList';

export default class ContactListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Contacts',
    headerRight: () => <Button title="Add" color='#a41034' onPress={() => {
      navigation.navigate('AddContact');
    }} />
  });

  state = {
    showContacts: true
  };

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}))
  }

  showForm = () => {
    this.props.navigation.navigate('AddContact');
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showContacts && (
          <ContactList
            contacts={this.props.route.params.contacts}
            onSelectContact={(contact) => {
              this.props.navigation.navigate('ContactDetails', {
                name: contact.name,
                phone: contact.phone
              });
            }}
          />
        )}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
