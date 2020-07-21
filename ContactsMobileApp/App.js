import React from 'react';

import contacts from './contacts';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import {Ionicons} from '@expo/vector-icons';
import {fetchUsers} from './api.js';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

class ContactStackScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-contacts`}
        size={25}
        color={tintColor}
      />
    )
  };

  state = {
    contacts: []
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const results = await fetchUsers();
    this.setState({contacts: results});
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }))
  }

  render() {
    return (
        <Stack.Navigator initialRouteName="ContactList" screenOptions={{
            headerTintColor: '#a41034'
        }}>
            <Stack.Screen
              name="AddContact"
              component={AddContactScreen}
              initialParams={{addContact: this.addContact}}
              options={AddContactScreen.navigationOptions}
            />
            <Stack.Screen
              name="ContactList"
              component={ContactListScreen}
              initialParams={{contacts: this.state.contacts}}
              options={ContactListScreen.navigationOptions}
            />
            <Stack.Screen
              name="ContactDetails"
              component={ContactDetailsScreen}
              initialParams={{contacts: this.state.contacts}}
              options={ContactDetailsScreen.navigationOptions}
            />
        </Stack.Navigator>
    );
  }
}

export default class App extends React.Component {
  state = {
    isLoggedIn: false
  }

  toggleLogIn = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }))
  }

  render() {
    return (
      <NavigationContainer>
      {this.state.isLoggedIn ? (
        <Tab.Navigator screenOptions={{
          activeTintColor: '#a41034'
        }}>
          <Tab.Screen
            name="Contacts"
            component={ContactStackScreen}
            options={ContactStackScreen.navigationOptions}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={SettingsScreen.navigationOptions}
          />
        </Tab.Navigator>
      ): (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{toggleLogIn: this.toggleLogIn}}
          />
        </Stack.Navigator>
      )}
      </NavigationContainer>
    );
  }
}
