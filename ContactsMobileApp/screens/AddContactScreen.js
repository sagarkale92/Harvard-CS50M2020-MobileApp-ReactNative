import React from 'react';
import AddContactForm from '../AddContactForm';

export default class AddContactScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Add Contact'
  }

  handleSubmit = formState => {
    const contacts = this.props.route.params.addContact(formState);
    this.props.navigation.navigate("ContactList");
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />;
  }
}
