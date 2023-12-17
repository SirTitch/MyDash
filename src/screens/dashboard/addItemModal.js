import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './dashboard.style';
import GeneralInput from '../../sharedComponents/generalInput';

const AddItemModal = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.showAddItemModal}
    >
        <View style={{flex: 1, paddingHorizontal: '5%', paddingVertical: '10%', backgroundColor: '#00000033'}}>
            <View style={{borderWidth: 2, borderColor: 'lightgrey', backgroundColor: '#fff', flex: 1, borderRadius: 6, paddingHorizontal: '2%'}}>
            <View style={{flex: 1, alignItems: 'center', paddingVertical: '5%'}}>
                <Text style={styles.headerTextStyle}>
                    { "Add New Item"}
                </Text>
            </View>
            <View style={{flex: 5}}>
                <GeneralInput
                    title={"Item Name"}
                    value={name}
                    placeholder={'Please enter new item name'}
                    onChangeText={setName}
                />
                <GeneralInput
                    title={"Item Description"}
                    value={description}
                    placeholder={'Please enter new item description'}
                    onChangeText={setDescription}
                />
            </View>
            <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{paddingHorizontal: '2%', paddingVertical: '5%'}} 
                onPress={() => {
                    props.createNewItem(name, description)
                }}>
                    <View style={{ borderRadius: 6, backgroundColor: '#5783db', width: '100%', alignItems: 'center', paddingVertical: '3%'}}>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>{'Add New Item'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </Modal>
  );
};

export default AddItemModal;
