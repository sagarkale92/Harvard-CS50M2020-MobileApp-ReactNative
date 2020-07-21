import React from 'react';
import {Button, Text, View} from 'react-native';

export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = ({route, navigation}) => ({
    headerTitle: route.params.name
  });

  render() {
    return (
      <View>
        <Text>{this.props.route.params.phone}</Text>
        <Button title="Go to random contact" onPress={this._goToRandom} />
        <Button title="Go to Contacts" onPress={() => {
          this.props.navigation.navigate('ContactList')
        }} />
      </View>
    );
  }

  _goToRandom = () => {
    const contacts = this.props.route.params.contacts;
    const phone = this.props.route.params.phone;
    let randomContact;
    while(!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if(contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }

    this.props.navigation.push('ContactDetails', {
      name: randomContact.name,
      phone: randomContact.phone
    })
  }
}
