import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Animated, ActivityIndicator, TouchableOpacity, Alert, Modal } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedProgressComponent from '../../sharedComponents/animatedProgress';
import DashboardList from './dashboardList';
import styles from './dashboard.style';
import {setUserLoggedIn, setUserProfile, setAllItems, setTopSellers, setOutOfStock} from "../../redux/actions/profile";
import AddItemModal from './addItemModal';

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
      loading: true,
      showAddItemModal: false,
      listIndex: 0,
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

  componentDidUpdate (nextProps) {
    // if (this.props.userLoggedIn ===)
  }

  onLogoutPressed = () => {
    this.setState({loading: true});
    //Short timeout to mimic restAPI
    Alert.alert('Logout', "Are you sure you want to logout of your dashboard?", [
      {
        text: 'yes',
        onPress: () => {
          setTimeout(() => {
            this.props.navigation.pop();
            this.props.setUserLoggedInRedux({userLoggedIn: false});
            this.props.setUserProfileRedux({userProfile: {}});
            this.props.setTopSellersRedux({topSellers : []});
            this.props.setOutOfStockRedux({outOfStock: []});
            this.props.setAllItemsRedux({allItems: []});
          }, 2000);
        }
      },
      {
        text: 'no',
        onPress: () => { this.setState({loading: false})}
      }
    ])
  }

  toggleAddItemModal = (index) => {
    this.setState({showAddItemModal: !this.state.showAddItemModal, listIndex: index})
  }

  //Create item just updates Redux so data will be lost on reset, as data is just in a JSON file
  createNewItem = (name, description) => {
    let allItems = this.props.allItems;
    let topSellers = this.props.topSellers;
    let outOfStock = this.props.outOfStock;
    let profile = this.props.userProfile;
    let dash = profile.dashboard;

    let id = allItems.length + 1;
    let newItem = {
      id: id,
      name: name,
      description: description,
      image:  "https://picsum.photos/200?random=" + id,
    }
    allItems.push(newItem);
    if (this.state.listIndex === 0) {
      topSellers.push(newItem);
    } else if ( this.state.listIndex === 1){
      outOfStock.push(newItem);
    }

    dash.stock_sold = dash.stock_sold + 1;
    dash.alloted_stock = dash.alloted_stock + 1;

    profile.dashboard = dash;

    this.props.setUserProfileRedux({userProfile: profile});
    this.props.setTopSellersRedux({topSellers : topSellers});
    this.props.setOutOfStockRedux({outOfStock: outOfStock});
    this.props.setAllItemsRedux({allItems: allItems});

    this.toggleAddItemModal(2);
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
         <> 
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
                      colour1={'#5783db'}
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
              onAddItemPressed={this.toggleAddItemModal}
            />
          </Animated.ScrollView>
         </>
        )}
        {this.state.showAddItemModal && (
          <AddItemModal 
            itemIndex={this.state.itemIndex} 
            showAddItemModal={this.state.showAddItemModal} 
            toggleModal={this.toggleAddItemModal}
            createNewItem={this.createNewItem}
          />
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

