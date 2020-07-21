import React from 'react';
import {Button, View, StyleSheet, Text, TextInput} from 'react-native';
import {login} from '../api.js';

export default class LoginScreen extends React.Component {
  state = {
    username: "",
    password: ""
  }

  _login = async () => {
    try {
      const success = await login(this.state.username, this.state.password);
      //navigate to main container
      this.props.route.params.toggleLogIn();
    } catch (err) {
      const errMessage = err.message;
      this.setState({err: errMessage});
    }
  }

  handlerUsernameUpdate = username => {
    this.setState({username});
  }

  handlerPasswordUpdate = password => {
    this.setState({password});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.err}</Text>
        <TextInput
          placeholder="username"
          value={this.state.username}
          onChangeText={this.handlerUsernameUpdate}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlerPasswordUpdate}
          secureTextEntry={true}
        />
        <Button title="Press to Log In" onPress={this._login} />
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
  },
  error: {
    textAlign: 'center',
    color: 'red'
  }
});
