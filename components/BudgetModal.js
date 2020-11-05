import React, { Component } from 'react'
import {Modal, StyleSheet, TouchableHighlight, TextInput} from 'react-native'

//native base
import {Text, View, Radio, Right, Left, ListItem} from 'native-base';
import { firebase } from '../util/firebase';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class BudgetModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            amount: '',
            date: new Date().toISOString(),
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.visible !== this.props.visible){
            this.setState({visible: this.props.visible});
            this.setState({date: new Date().toISOString()});
        }
    }
    
    handleAmount = (text) => {
        this.setState({amount:text});
    }

    handleDate = (text) => {
        this.setState({date:text});
    }

    handleSubmit = () => {
        let currentComponent = this;
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});
        console.log("submitting");
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                let budgets = "budgets";
                let amountToBe;
                if(currentComponent.state.amount === ''){
                    amountToBe = 0;
                }
                else{
                    amountToBe = Number(currentComponent.state.amount);
                }

                const addThis = {
                    amount: amountToBe,
                    date: currentComponent.state.date,
                }

                firebase.firestore().collection(`/users/${user.email}/${budgets}`).doc(month).set(addThis)
                    .then((doc)=>{
                        console.log("doc written with id: ", month);
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
            }
            else{
                console.log("somehow no user");
            }
        });  
    }

    render() {
        return (
            <Modal animationType="slide" visible={this.state.visible} transparent={true}>
                <View style={copStyles.centeredView}>
                    <View style={copStyles.modalView}>
                        <TextInput style={styles.textInputModal} placeholder="Budget Amount" placeholderTextColor = "#4a4a4a" onChangeText={this.handleAmount}/>
                        <TextInput style={styles.textInputModal} placeholder={this.state.date} defaultValue={this.state.date} placeholderTextColor = "#4a4a4a" onChangeText={this.handleDate}/>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                this.handleSubmit();
                                this.props.update();
                                this.props.action();
                            }}
                        >
                            <Text style={copStyles.textStyle}>Submit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                this.props.action();
                            }}
                        >
                            <Text style={copStyles.textStyle}>Cancel</Text>
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

export default BudgetModal
