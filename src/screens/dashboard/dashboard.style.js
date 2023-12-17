import React from 'react';
import {  StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    header: {
      height: 60,
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderBottomWidth:  1,
      borderBottomColor: 'grey',
      paddingHorizontal: '5%',
    },
    headerTextStyle: {
      fontSize: 18,
      fontWeight: '500',
      color: 'grey',
    },
    scrollViewStyle: {
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
    },
    loadingScreenWrapper: {
      height: '100%',
      width: '100%',
      flex: 1,
      backgroundColor: '#C4C4C480',
    },
    loadingScreenInnerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    spentContainer: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'lightgrey',
      paddingHorizontal: '5%',
      paddingVertical: '5%',
    },
    subtitle_text: {
      fontWeight: '400',
      color: 'grey',
    },
    greyText: {
      fontWeight: '400',
      color: 'grey',
    },
    componentSection: {
      paddingHorizontal: '5%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '2%',
    },
    componentSectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: 'grey',
    },
    updateTitleText: {
      fontSize: 24,
      fontWeight: '700',
      color: 'grey',
    },
    progressWrapper: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    listSubTitleText: {
      fontSize: 12,
      fontWeight: '400',
      color: 'grey',
    },
    listValueText: {
      fontSize: 12,
      fontWeight: '600',
      color: 'grey',
    },
    listWrapper: {
      paddingVertical: '2%',
      flex: 1,
    },
    horizontalListStyle: {
      width: '95%',
      paddingBottom: '2%',
      flex: 1,
      alignSelf: 'flex-end',
    },
    iconContainer: {
      backgroundColor: 'white',
      borderColor: '#D6DDDD',
      borderWidth: 1,
      alignItems: 'center',
      height: 38,
      width: 38,
      borderRadius: 19,
      justifyContent: 'center',
    },
    acronymContainer: {
      height: 33,
      width: 33,
      borderRadius: 19,
      backgroundColor: 'black',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: '5%',
    },
  });

  export default styles