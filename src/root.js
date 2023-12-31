import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import LoginScreen from './screens/login/loginScreen';
import DashboardScreen from './screens/dashboard/dashboardScreen';
import SplashScreen from './screens/splashScreen';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const Stack = createStackNavigator();

    return (
      <View
        style={{
          flex: 1,
        }}>
        <NavigationContainer >
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export {
  Root
};
