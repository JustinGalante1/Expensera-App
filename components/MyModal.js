import React, { Component } from 'react'
import {Modal, StyleSheet, TouchableHighlight, TextInput} from 'react-native'

//native base
import {Text, View} from 'native-base';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class MyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.visible !== this.props.visible){
            this.setState({visible: this.props.visible});
        }
    }
    
    handleName(){

    }

    render() {
        return (
            <Modal animationType="slide" visible={this.state.visible} transparent={true}>
                <View style={copStyles.centeredView}>
                    <View style={copStyles.modalView}>
                        <Text style={copStyles.modalText}>Hello World!</Text>
                        <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor = "#4a4a4a" onChangeText={this.handleName()}/>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                this.props.action();
                            }}
                        >
                        <Text style={copStyles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }
}

const copStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default MyModal
