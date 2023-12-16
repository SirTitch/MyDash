import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import GeneralInput from '../sharedComponents/generalInput';

class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        email: '',
        showEmailError: false,
        emailErrorMessage: 'This is not a valid email address',
        password: '',
        showPasswordError: false,
        passwordErrorMessage: 'Invalid password, password must be 8 characters or more'
      };
  }

  onChangeEmailText = (text) => {
    this.setState({email: text});
  }

  checkEmail = () => {
    let isEmailValid = this.validateEmailFormat();
    if (isEmailValid !== true){
      this.setState({showEmailError: true, emailErrorMessage: 'This is not a valid email address'}, () => {
        setTimeout(() => {
          this.setState({showEmailError: false})
        }, 2000)
      });
    } else {
      this.setState({showEmailError: false});
    }
  }

  //Uses regex to validate the format of the email address, returning a bool
  validateEmailFormat = () => {
    let regex =/^\S+@\S+\.\S+$/;
    if(!new RegExp(regex).test(this.state.email)){
      return false;
    } else {
      return true;
    }
  }

  onChangePasswordText=(text) => {
    this.setState({password: text});
  }

  checkPassword = () => {
    if (this.checkPasswordLength() !== true){
      this.setState({showPasswordError: true, passwordErrorMessage: 'Password must be 8 characters or more'}, () => {
        setTimeout(() => {
          this.setState({showPasswordError: false})
        }, 2000)
      });
    } else {
      this.setState({showPasswordError: false});
    }
  }

  checkPasswordLength = () => {
    if (this.state.password.length > 7){
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, borderWidth: 2}}>

        </View>
        <View style={{flex: 4, paddingHorizontal: '5%'}}>
          <View style={{flex: 4}}>
            <GeneralInput
              title={"Email"}
              value={this.state.email}
              inputMode={'email'}
              placeholder={'Please enter a valid email-address'}
              onChangeText={this.onChangeEmailText}
              errorMessage={this.state.emailErrorMessage}
              showErrorMessage={this.state.showEmailError}
              onEndEditing={() => {
                this.checkEmail();
              }}
            />

            <GeneralInput
              title={"Password"}
              value={this.state.password}
              placeholder={'Please enter a password with 8 or more characters'}
              onChangeText={this.onChangePasswordText}
              errorMessage={this.state.passwordErrorMessage}
              showErrorMessage={this.state.showPasswordError}
              onEndEditing={() => {
                this.checkPassword();
              }}
              censorInput={true}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity style={{paddingHorizontal: '2%'}} 
            onPress={() => {
              // this.props.navigation.navigate('Dashboard', {});
            }}>
              <View style={{ borderRadius: 6, backgroundColor: '#5783db', width: '100%', alignItems: 'center', paddingVertical: '3%'}}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>{'Login'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
