import React from 'react';
import Constants from 'expo-constants'

import contacts, {compareNames} from './contacts';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactsListScreen';

const AppNavigator = createSwitchNavigator({
  AddContact: AddContactScreen,
  ContactList: ContactListScreen
}, {
  initialRouteName: 'ContactList'
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    contacts: contacts
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      showForm: false
    }))
  }

  render() {
    return <AppContainer screenProps={{
      contacts: this.state.contacts,
      addContact: this.addContact
    }}/>
  }
}
