import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class GeneralInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInputValue: false,
            value: this.props.value,
            showError: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={{ paddingHorizontal: '2%', paddingVertical: '2%'}}>
                <View style={{ paddingVertical: '1%'}}>
                    <Text>{this.props.title}</Text>
                </View>
                <View style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: this.props.showErrorMessage === true ? 'red' :'black', borderRadius: 6, flexDirection: 'row'}}>
                    <View style={{flex: 8}}>
                        <TextInput
                            style={[Platform.OS == 'ios' && { paddingVertical: '3%', paddingHorizontal: '1%'}]}
                            onChangeText={text => this.props.onChangeText(text)}
                            value={this.props.value}
                            secureTextEntry={this.props.censorInput === true ? !this.state.showInputValue : false}
                            inputMode={this.props.inputMode}
                            placeholder={this.props.placeholder}
                            onEndEditing={this.props.onEndEditing}
                        />
                    </View>
                    {this.props.censorInput === true && this.props.value.length > 0 &&  (
                        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons name={this.state.showInputValue ? "eye-off" : "eye"} size={25} onPress={() => this.toggleCensor()} color={'grey'} />
                        </View>
                    )}
                </View>
                    <View style={{paddingVertical: '1%', opacity: this.props.showErrorMessage === true ? 1 : 0}}>
                        <Text style={{color: 'red', fontStyle: 'italic'}}>{this.props.errorMessage}</Text>
                    </View>
          </View>
        );
    }

    toggleCensor() {
        let showInputValue = !this.state.showInputValue;

        this.setState({
            showInputValue: showInputValue,
        });
    }
}

const styles = StyleSheet.create({
});


export default GeneralInput;
