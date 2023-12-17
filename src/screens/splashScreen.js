import React, { useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, View, Image} from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {Easing} from 'react-native-reanimated';
import MyDashTextLogo from '../assets/myDashTextLogo.svg'
import { connect, useSelector } from 'react-redux';
import { UserService } from '../api/userService';
const ShowSplashImage = (props) => {
  const animatedValue = useSharedValue(0);
  
  const style = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      height: interpolate(animatedValue.value,[0, 1], [0, 100]),
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    };
  });

  useEffect(() => {
    if (props.opacity !== animatedValue.value){
      animatedValue.value = withTiming(props.opacity, { duration: 2000, easing: Easing.linear })
    }
  }, [])

  return (
    <View
      style={{
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Animated.View style={style}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
             <MyDashTextLogo height={50} width={200}/>
            </View>
        </Animated.View>
      
    </View>
  );
}

const SplashScreen = (props) => {
  const [loading, setLoading] = useState(true);
    const userService = new UserService;
     console.log(props);
     if (props.userLoggedIn === true) {
        setTimeout(() => {
            props.navigation.navigate('Dashboard', {userService: userService})
         }, 2000)
     } else {
        setTimeout(() => {
            props.navigation.navigate('Login', {userService: userService})
         }, 2000)
     }
    return (
      <View
        style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          backgroundColor={'#fff'}
          barStyle="light-content"
        />

        <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center", flex: 1}}>
          <ShowSplashImage opacity={0.99}/>
        </View>
      </View>
    );
};

const mapStateToProps = (state) => {
  let userLoggedIn = state.userLoggedIn;
  let userProfile = state.userProfile;
	return {
    userLoggedIn: userLoggedIn,
    userProfile: userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
};

const SplashScreenConnected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SplashScreen)

export default SplashScreenConnected;
