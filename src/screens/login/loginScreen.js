import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, StatusBar, Alert } from 'react-native';
import GeneralInput from '../../sharedComponents/generalInput';
import MyDashTextLogo from '../../assets/myDashTextLogo.svg'
import { connect } from 'react-redux';
import { UserService } from '../../api/userService';
import {setUserLoggedIn, setUserProfile, setAllItems, setTopSellers, setOutOfStock} from "../../redux/actions/profile"


class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userService: this.props.route.params.userService,
        value: '',
        email: '',
        showEmailError: false,
        emailErrorMessage: 'This is not a valid email address',
        password: '',
        showPasswordError: false,
        passwordErrorMessage: 'Invalid password, password must be 8 characters or more',
        isLoading: false
      };
  }

  onChangeEmailText = (text) => {
    this.setState({email: text});
  }

  checkEmail = (isLogin) => {
    let isEmailValid = this.validateEmailFormat();
    if (isEmailValid !== true){
      this.setState({showEmailError: true, emailErrorMessage: 'This is not a valid email address'}, () => {
        setTimeout(() => {
          this.setState({showEmailError: false})
        }, 2000)
      });
      if (isLogin === true){
        return false
      }
    } else {
      this.setState({showEmailError: false});
      if (isLogin === true){
        return true
      }
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

  checkPassword = (isLogin) => {
    if (this.checkPasswordLength() !== true){
      this.setState({showPasswordError: true, passwordErrorMessage: 'Password must be 8 characters or more'}, () => {
        setTimeout(() => {
          this.setState({showPasswordError: false})
        }, 2000)
      });
      if (isLogin === true){
        return false
      }
    } else {
      this.setState({showPasswordError: false});
      if (isLogin === true){
        return true
      }
    }
  }

  checkPasswordLength = () => {
    if (this.state.password.length > 7){
      return true;
    } else {
      return false;
    }
  }

  onLoginPressed = () => {
    if (this.checkPassword(true) === true && this.checkEmail(true) === true){
      this.setState({isLoading: true});
      try {
        let response = this.state.userService.doLogin(this.state.email, this.state.password);
        if (response.status === 'success'){
          let payload1 = {userProfile: response.response}
          let topSellers = this.state.userService.getDashboardItems(response.response.dashboard.top_sellers);
          let outOfStock = this.state.userService.getDashboardItems(response.response.dashboard.items_out_of_stock);
          let allItems = this.state.userService.getAllDashboardItems()
          this.props.setUserLoggedInRedux({userLoggedIn: true});
          this.props.setUserProfileRedux(payload1);
          this.props.setTopSellersRedux({topSellers : topSellers});
          this.props.setOutOfStockRedux({outOfStock: outOfStock});
          this.props.setAllItemsRedux({allItems: allItems});
          //Short timeout to mimic restAPI
          setTimeout(() => {
            this.props.navigation.navigate('Dashboard', { userService: this.state.userService});
            this.setState({email: '', password: '', isLoading: false})
          }, 2000);
        }      
      } catch (error) {
        this.setState({isLoading: false})
        Alert.alert("Error", "Sorry we seem to be having trouble fecthing your profile. Please try again later.");
      }
    } else {
        if (response.response.variable === 'email'){
          this.setState({showEmailError: true, emailErrorMessage: response.response.msg, isLoading: false}, () => {
            setTimeout(() => {
              this.setState({showEmailError: false})
            }, 2000)
          });
        } else {
          this.setState({showPasswordError: true, passwordErrorMessage: response.response.msg, isLoading: false}, () => {
            setTimeout(() => {
              this.setState({showPasswordError: false})
            }, 2000)
          });
        }
    }
  } 


  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
          barStyle="dark-content"
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
             <MyDashTextLogo height={50} width={200}/>
        </View>
        <View style={{flex: 4, paddingHorizontal: '5%'}}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: '600'}}>Login</Text>
          </View>
          <View style={{flex: 4}}>
            <View style={{}}>
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
            </View>
            <View style={{}}>
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
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity style={{paddingHorizontal: '2%'}} 
            onPress={() => {
              this.onLoginPressed();
              // this.props.navigation.navigate('Dashboard', {});
            }}>
              <View style={{ borderRadius: 6, backgroundColor: '#5783db', width: '100%', alignItems: 'center', paddingVertical: '3%'}}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>{'Login'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isLoading === true && (
          <SafeAreaView style={{flex: 1, height: '100%', width: "100%", position: 'absolute', justifyContent: 'center', backgroundColor: '#C4C4C480'}}>
              <ActivityIndicator size={100} color={'#5783db'}/>
          </SafeAreaView>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  let userLoggedIn = state.userLoggedIn;
  let userProfile = state.userProfile;
  let topSellers = state.topSellers;
  let outOfStock = state.outOfStock;
  let allItems = state.allItems;
  return {
    userLoggedIn: userLoggedIn,
    userProfile: userProfile,
    topSellers: topSellers,
    outOfStock: outOfStock,
    allItems: allItems,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserLoggedInRedux: userLoggedIn =>
      dispatch(setUserLoggedIn(userLoggedIn)),
    setUserProfileRedux: userProfile =>
      dispatch(setUserProfile(userProfile)),
    setTopSellersRedux: topSellers =>
      dispatch(setTopSellers(topSellers)),
    setOutOfStockRedux: outOfStock =>
      dispatch(setOutOfStock(outOfStock)),
    setAllItemsRedux: allItems =>
      dispatch(setAllItems(allItems)),
  };
};

const loginScreen = connect(
  mapStateToProps,
  mapDispatchToProps  )( LoginScreen);

export default loginScreen;
