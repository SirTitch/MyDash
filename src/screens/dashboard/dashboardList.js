import React from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './dashboard.style';

const listWidth = Dimensions.get('window').width * 0.92;

class DashboardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.listRef = React.createRef()
  }

  // Renders the list container and then maps out the lists fromthe data provided
  renderLists = ({item, index}) => {
    console.log(item
        )
    return (
      <View
        style={{
          paddingRight: '2%',
          paddingVertical: '2%',
          width: listWidth,
          paddingHorizontal: index > 0 ? '2%' : 0,
          minHeight: 350,
        }}>
        <View style={styles.spentContainer}>
          <View style={{height: '100%'}}>
            <View
              style={styles.listHeaderContainer}>
              <View style={{flex: 3}}>
                <Text style={styles.componentSectionTitle}>
                  {item.title}
                </Text>
              </View>
            </View>
            {item.data.map((listItem, index) => {
              return (
                <View style={{paddingVertical: '2%', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'lightGrey'}}>
                  <View
                    style={{width: '100%', height: 50, flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                      }}>
                        <Image
                            style={{height: 40, width: 40, borderRadius: 6, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightGrey'}}
                            source={{
                                uri: listItem.image,
                              }}
                      
                        />
                        {/* <Image source={"https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"} style={{height: 50, width: 50}}/> */}
                    </View>
                    <View style={{flex: 11, justifyContent: 'center'}}>
                      <View
                        style={{flexDirection: 'row', paddingVertical: '1%'}}>
                        <View
                          style={{
                            flex: 4,
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.listValueText}>
                            {listItem.name}
                          </Text>
                        </View>
                      </View>
                        <Text style={styles.listSubTitleText}>
                            {listItem.description}
                        </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const renderComponentTitle = title => {
      return (
        <View style={styles.componentSection}>
          <View style={{flex: 9}}>
            <Text style={styles.componentSectionTitle}>{title}</Text>
          </View>
          <View style={{flex: 1, transform: [{rotateY: '180deg'}]}}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={20}
              color={'grey'}
              onPress={() => {
                this.listRef.scrollToEnd({animated: true})
              }}
            />
          </View>
        </View>
      );
    };

    return (
      <View style={styles.listWrapper}>
        {renderComponentTitle('Dashboard Items')}
        <FlatList
          ref={ref => (this.listRef = ref)}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.lists}
          extraData={this.props.loading}
          renderItem={this.renderLists}
          horizontal={true}
          style={styles.horizontalListStyle}
        />
      </View>
    );
  }
}

export default DashboardList;