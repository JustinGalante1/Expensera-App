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
            month: new Date().toLocaleString('default', {month: 'long'}),
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

    handleMonth = (text) => {
        this.setState({month:text});
    }

    resetValues = () => {
        this.setState({
            amount: '',
            month: new Date().toLocaleString('default', {month: 'long'}),
        })
    }

    handleSubmit = () => {
        let currentComponent = this;
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
                    month: currentComponent.state.month.trim(),
                }

                firebase.firestore().collection(`/users/${user.email}/${budgets}`).doc(currentComponent.state.month.trim()).set(addThis)
                    .then((doc)=>{
                        console.log("doc written with id: ", doc.id);
                        currentComponent.resetValues();
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
                        <ListItem style={{width: '100%'}}>
                            <TextInput style={styles.textInputModal} placeholder="Budget Amount" placeholderTextColor = "#d3d3d3" onChangeText={this.handleAmount}/>
                        </ListItem>
                        <ListItem style={{width: '100%'}}>
                            <TextInput style={styles.textInputModal} defaultValue={this.state.month} placeholderTextColor = "#d3d3d3" onChangeText={this.handleMonth}/>
                        </ListItem>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: "#2fc547", margin: 10 }}
                            onPress={() => {
                                this.handleSubmit();
                                this.props.action();
                            }}
                        >
                            <Text style={copStyles.textStyle}>Submit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: 'red' }}
                            onPress={() => {
                                this.resetValues();
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
