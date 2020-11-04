import React, { Component } from 'react'
import {Modal, StyleSheet, TouchableHighlight, TextInput} from 'react-native'

//native base
import {Text, View, Radio, Right, Left, ListItem} from 'native-base';
import { firebase } from '../util/firebase';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class MyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            name: '',
            isExpense: true,
            amount: '',
            date: new Date().toISOString(),
            recurring: false,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.visible !== this.props.visible){
            this.setState({visible: this.props.visible});
            this.setState({date: new Date().toISOString()});
        }
    }
    
    handleName = (text) => {
        this.setState({name: text});
    }

    handleAmount = (text) => {
        this.setState({amount:text});
    }

    handleDate = (text) => {
        this.setState({date:text});
    }

    handleSubmit = () => {
        let currentComponent = this;
        console.log("submitting");
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                let expenseOrIncome = "";
                if(currentComponent.state.isExpense){
                    expenseOrIncome = "expenses";
                }
                else{
                    expenseOrIncome = "incomes";
                }
                
                let nameToBe;
                let amountToBe;

                if(currentComponent.state.name === ''){
                    nameToBe = "default"
                }
                else{
                    nameToBe = currentComponent.state.name;
                }

                if(currentComponent.state.amount === ''){
                    amountToBe = 0;
                }
                else{
                    amountToBe = Number(currentComponent.state.amount);
                }

                const addThis = {
                    name: nameToBe,
                    amount: amountToBe,
                    date: currentComponent.state.date,
                    recurring: currentComponent.state.recurring,
                }

                firebase.firestore().collection(`/users/${user.email}/${expenseOrIncome}`).add(addThis)
                    .then((doc)=>{
                        console.log("doc written with id: ", doc.id);
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
                        <ListItem style={{width: '100%'}} onPress={()=>this.setState({isExpense: true})}>
                            <Left>
                                <Text style={{color: 'black'}}>Expense</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.isExpense}/>
                            </Right>
                        </ListItem>
                        <ListItem style={{width: '100%'}} onPress={()=>this.setState({isExpense: false})}>
                            <Left>
                                <Text>Income</Text>
                            </Left>
                            <Right>
                                <Radio selected={!this.state.isExpense}/>
                            </Right>
                        </ListItem>
                        <TextInput style={styles.textInputModal} placeholder="Name" placeholderTextColor = "#4a4a4a" onChangeText={this.handleName}/>
                        <TextInput style={styles.textInputModal} placeholder="Amount" placeholderTextColor = "#4a4a4a" onChangeText={this.handleAmount}/>
                        <TextInput style={styles.textInputModal} placeholder={this.state.date} defaultValue={this.state.date} placeholderTextColor = "#4a4a4a" onChangeText={this.handleDate}/>
                        <ListItem style={{width: '100%'}} onPress={()=>this.setState({recurring: !this.state.recurring})}>
                            <Left>
                                <Text style={{color: 'black'}}>Recurring</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.recurring}/>
                            </Right>
                        </ListItem>
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

export default MyModal
