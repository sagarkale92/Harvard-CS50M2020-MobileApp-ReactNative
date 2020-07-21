import React from 'react';
import {TextInput, KeyboardAvoidingView, StyleSheet, View, Button} from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center'
  },
  input: {
    minWidth: 100,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 3,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  }
});

export default class AddContactForm extends React.Component {
  static propTypes = {
    addContact: PropTypes.func
  }

  state = {
    name: '',
    phone: '',
    isFormValid: false
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
      this.validateForm();
    }
  }

  getHandler = key => val => {
    this.setState({[key]: val})
  }

  handleNameChange = this.getHandler('name');
  handlePhoneChange = this.getHandler('phone');
  /*
  handleNameChange = (name) => {
    this.setState({name})
  }

  handlePhoneChange = (phone) => {
    if(+phone >= 0 && phone.length <= 10) {
      this.setState({phone})
    }
  } */

  validateForm = () => {
    const names = this.state.name.split(' ');
    if(+this.state.phone >= 0 && this.state.phone.length <= 10 && names.length <= 2 && names[1]) {
      this.setState({isFormValid: true});
    } else {
      this.setState({isFormValid: false});;
    }
  }

  handleSubmit = () => {
    if(+this.state.phone >= 0 && this.state.phone.length <= 10 && this.state.name.length >= 3) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behaviour="height" style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={this.getHandler('name')}
          value={this.state.name}
          placeholder="Name"
        />
        <TextInput style={styles.input}
          onChangeText={this.getHandler('phone')}
          value={this.state.phone}
          keyboardType="numeric"
          placeholder="Phone"
        />
        <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid}/>
      </KeyboardAvoidingView>
    );
  }
}
