import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Animated, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedProgressComponent from '../../sharedComponents/animatedProgress';
import DashboardList from './dashboardList';
import styles from './dashboard.style';
import {setUserLoggedIn, setUserProfile, setAllItems, setTopSellers, setOutOfStock} from "../../redux/actions/profile";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          index: 0,
          title: 'Top Sellers',
          data: [
          ],
        },
        {
          index: 1,
          title: 'Out Of Stock',
          data: [],
        },
        {
          index: 2,
          title: 'All Items',
          data: [],
        },
      ],
      loading: true
    };
  }

  componentDidMount () {
    if (this.props.userProfile !== undefined){
      let lists = this.state.lists;
      lists[0].data = this.props.topSellers;
      lists[1].data = this.props.outOfStock;
      lists[2].data = this.props.allItems
      this.setState({lists: lists, loading: false});
    }
  }

  onLogoutPressed = () => {
    this.setState({loading: true});
    //Short timeout to mimic restAPI
    Alert.alert('Logout', "Are you sure you want to logout of your dashboard?", [
      {
        text: 'yes',
        onPress: () => {
          setTimeout(() => {
            this.props.navigation.navigate('Login', { userService: this.props.route.params.userService});
            setTimeout(() => {
              this.props.setUserLoggedInRedux({userLoggedIn: false});
              this.props.setUserProfileRedux({userProfile: {}});
              this.props.setTopSellersRedux({topSellers : []});
              this.props.setOutOfStockRedux({outOfStock: []});
              this.props.setAllItemsRedux({allItems: []});
            }, 1000)
          }, 2000);
        }
      },
      {
        text: 'no',
        onPress: () => { this.setState({loading: false})}
      }
    ])
  }

  render() {
    const { userProfile, userLoggedIn} = this.props

    const renderLineSeperator = () => {
      return (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "grey",
            paddingHorizontal: '5%',
            paddingVertical: '3%',
          }}></View>
      );
    }

    return (
      <SafeAreaView style={{flex: 1}}>
       <StatusBar
          barStyle="dark-content"
        />
       <View style={styles.header}>
        <View style={{flex: 9, alignSelf: 'center'}}>
          <Text style={styles.headerTextStyle}>
            { userProfile?.email + "'s Dashboard"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
            <TouchableOpacity onPress={() => {this.onLogoutPressed()}}>
              <MaterialCommunityIcons
                name={'logout'}
                size={25}
                color={"grey"}
              />
            </TouchableOpacity>
        </View>
      </View>
      {this.state.loading ? (
          <View style={styles.loadingScreenWrapper}>
            <View style={styles.loadingScreenInnerContainer}>
              <ActivityIndicator
                size={100}
                color={'#5783db'}
              />
            </View>
          </View>
        ) : (
          <Animated.ScrollView style={styles.scrollViewStyle}>
            <View style={{paddingHorizontal: '5%', paddingVertical: '5%'}}>
              <View style={styles.spentContainer}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 3,
                      justifyContent: 'space-evenly',
                    }}>
                    <MaterialCommunityIcons
                      name={'application'}
                      size={25}
                      color={"grey"}
                    />
                    <View style={{}}>
                      <Text style={styles.subtitle_text}>
                        {"Stock Items Sold"}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        maxFontSizeMultiplier={1.8}
                        style={styles.updateTitleText}>
                        {userProfile.dashboard.stock_sold}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressWrapper}>
                    <AnimatedProgressComponent
                      progress={userProfile.dashboard.stock_sold/userProfile.dashboard.alloted_stock}
                      width={125}
                      colour1={'blue'}
                    />
                  </View>
                </View>

                {renderLineSeperator()}

                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: '2%',
                    paddingTop: '5%',
                  }}>
                  <View style={{flex: 2}}>
                    <Text style={styles.greyText}>
                      {"Stock this month"}
                    </Text>
                    <Text
                      maxFontSizeMultiplier={1.8}
                      style={styles.componentSectionTitle}>
                      {userProfile.dashboard.alloted_stock}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <DashboardList
              lists={this.state.lists}
              loading={this.state.loading}
            />
          </Animated.ScrollView>
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

const dashboardScreen = connect(
  mapStateToProps,
  mapDispatchToProps  )( DashboardScreen);

export default dashboardScreen;

