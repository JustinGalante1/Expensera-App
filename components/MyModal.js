import React, { Component } from 'react'
import {Modal, StyleSheet, TouchableHighlight, TextInput} from 'react-native'

//native base
import {Text, View, CheckBox, Right, Left, ListItem, DatePicker} from 'native-base';
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
            date: (new Date().getFullYear())+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()),
            month: new Date().toLocaleString('default', {month: 'long'}),
            recurring: false,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.visible !== this.props.visible){
            this.setState({visible: this.props.visible});
        }
    }

    resetValues = () =>{
        this.setState({
            name: '',
            isExpense: true,
            amount: '',
            date: (new Date().getFullYear())+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()),
            month: new Date().toLocaleString('default', {month: 'long'}),
            recurring: false,
        })
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

    handleMonth = (text) => {
        this.setState({month:text})
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
                    if(isNaN(currentComponent.state.amount)){
                        amountToBe = 0;
                    }
                    else{
                        amountToBe = Number(currentComponent.state.amount).toFixed(2);
                    }
                }

                const addThis = {
                    name: nameToBe,
                    amount: amountToBe,
                    date: currentComponent.state.date,
                    recurring: currentComponent.state.recurring,
                    month: currentComponent.state.month,
                    isExpense: currentComponent.state.isExpense,
                }

                firebase.firestore().collection(`/users/${user.email}/${expenseOrIncome}`).add(addThis)
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
                        <ListItem style={{width: '100%'}} onPress={()=>this.setState({isExpense: true})}>
                            <Left>
                                <Text style={{color: '#4a4a4a'}}>Expense</Text>
                            </Left>
                            <Right>
                                <CheckBox checked={this.state.isExpense} selectedColor={"#2fc547"} onPress={()=>this.setState({isExpense: true})}/>
                            </Right>
                        </ListItem>
                        <ListItem style={{width: '100%'}} onPress={()=>this.setState({isExpense: false})}>
                            <Left>
                                <Text style={{color: '#4a4a4a'}}>Income</Text>
                            </Left>
                            <Right>
                                <CheckBox checked={!this.state.isExpense} selectedColor={"#2fc547"} onPress={()=>this.setState({isExpense: false})}/>
                            </Right>
                        </ListItem>
                        <ListItem style={{width: '100%'}}>
                            <TextInput style={styles.textInputModal} placeholder="Name" placeholderTextColor = "#d3d3d3" onChangeText={this.handleName}/>
                        </ListItem>
                        <ListItem style={{width: '100%'}}>
                            <TextInput style={styles.textInputModal} placeholder="Amount" placeholderTextColor = "#d3d3d3" onChangeText={this.handleAmount}/>
                        </ListItem>
                        <ListItem style={{width: '100%'}}>
                            <TextInput style={styles.textInputModal} placeholder="Month" defaultValue={this.state.month} placeholderTextColor = "#d3d3d3" onChangeText={this.handleMonth}/>
                        </ListItem>
                        <ListItem style={{width: '100%'}} onPress={()=>this.setState({recurring: !this.state.recurring})}>
                            <Left>
                                <Text style={{color: '#4a4a4a'}}>Recurring</Text>
                            </Left>
                            <Right>
                                <CheckBox checked={this.state.recurring} selectedColor={"#2fc547"} onPress={()=>this.setState({recurring: !this.state.recurring})}/>
                            </Right>
                        </ListItem>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: "#2fc547", margin: 10}}
                            onPress={() => {
                                this.handleSubmit();
                                this.props.action();
                            }}
                        >
                            <Text style={copStyles.textStyle}>Submit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...copStyles.openButton, backgroundColor: "red" }}
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

export default MyModal
