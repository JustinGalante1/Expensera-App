import React, { Component } from 'react'
import {StyleSheet, Dimensions, ImageBackground} from 'react-native'

//native base
import {Card, Container, Button, Text, CardItem, View, List, ListItem} from 'native-base';

import { firebase } from '../util/firebase';

import { SafeAreaView } from 'react-navigation';

//our components
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import MyModal from '../components/MyModal';

//styles
import {PageStyle} from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
const styles = StyleSheet.flatten(PageStyle);

export class ExpenseOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: new Date().toLocaleString('default', {month: 'long'}),
            expenseSum: 0,
            incomeSum: 0,
            budget: 0,
            netSpending: 0,
            percent: 0,
            remaining: 0,
            expenseArray: [],
            bothArray: [],
            modal: false
        }
        this.expenseListener;
    }

    updateArray = () =>{
        let currentComponent = this;
        let tempArray2 = currentComponent.state.expenseArray.concat(currentComponent.state.incomeArray);
        tempArray2.sort(function(a, b){
            return (b.name.localeCompare(a.name));
        })

        currentComponent.setState({
            bothArray: tempArray2,
        })
    }

    changeInfo(){
        if(this.expenseListener != undefined){
            this.expenseListener();
        }
        let currentComponent = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentComponent.expenseListener = firebase.firestore().collection(`/users/${user.email}/expenses`).where("month", "==", currentComponent.state.month).onSnapshot((querySnapshot)=>{
                    let tempArray = [];
                    let totalExpense = 0;
                    querySnapshot.forEach((doc) => {
                        totalExpense += parseFloat(doc.data().amount);
                        tempArray.push(doc.data());
                    });
                    tempArray.sort(function(a, b){
                        return (b.name.localeCompare(a.name));
                    })
                    currentComponent.setState({
                        expenseArray: tempArray,
                    });
                    totalExpense = parseFloat(totalExpense).toFixed(2);
                    currentComponent.setState({expenseSum: totalExpense});
                })
            } else {
                // No user is signed in.
            }
        });
    }

    componentDidMount(){
        this.changeInfo();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.month !== this.state.month){
            this.changeInfo();
        }
    }
    
    showModal(){
        console.log("showing modal");
        this.setState({modal: true});
    }

    hideModal(){
        console.log("hiding modal");
        this.setState({modal: false});
    }

    setMonth(newMonth){
        this.setState({month: newMonth});
        //this.displayInfo();
    }

    render() {
        const { navigation } = this.props;
        const windowWidth = Dimensions.get('window').width;

        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <View style={{flex: 1}}>
                        <Header navigation = {navigation} setMonth={this.setMonth.bind(this)}/>
                    </View>
                    <View style={[styles.centerContainer], {flex: 2.2}}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Card style={{width: windowWidth-20, backgroundColor: '#RRGGBBFF', alignItems: 'center', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}>
                                <ImageBackground source={require('../assets/down.png')} style={{alignItems: 'center', overflow: 'hidden', width: "100%", borderRadius: 20}}>    
                                    <CardItem header style={styles.cardHeader, {backgroundColor: '#RRGGBBFF'}}>
                                    </CardItem>
                                    <CardItem style = {{backgroundColor: '#RRGGBBFF'}}>
                                        <Text style = {{fontSize: "30%", fontWeight: 'bold', backgroundColor: '#RRGGBBFF'}}>
                                            You've Spent:
                                        </Text>
                                    </CardItem>
                                    <CardItem style = {{backgroundColor: '#RRGGBBFF'}}>
                                        <Text style={{color: '#FF0000', fontSize: "40%", fontWeight: 'bold', backgroundColor: '#RRGGBBFF'}}>
                                            ${this.state.expenseSum * -1}
                                        </Text>
                                    </CardItem>
                                    <CardItem style = {{backgroundColor: '#RRGGBBFF'}}>
                                        <Text style = {{fontSize: "30%", fontWeight: 'bold', backgroundColor: '#RRGGBBFF'}}>
                                            This Month
                                        </Text>
                                    </CardItem>
                                    <CardItem footer style = {styles.cardFooter, {backgroundColor: '#RRGGBBFF'}}/>
                                </ImageBackground>
                            </Card>
                        </View> 
                        <MyModal visible={this.state.modal} action={this.hideModal.bind(this)}/>
                    </View>
                </SafeAreaView>
                <View style={{flex: 1, width: '100%', position: 'relative'}}>
                    <View style={{flexDirection: 'row', height: '100%', backgroundColor: 'red'}}>
                        <View style={{position: 'absolute', left: 0, backgroundColor: 'white', width: '50%', height: '100%'}}/>
                        <View style={{position: 'absolute', right: 0, backgroundColor: '#dcdcdc', width: '50%', height: '100%'}}/>
                        <ScrollView style={{width: '100%', backgroundColor: 'transparent'}}>
                            <List>
                                {this.state.expenseArray.map((item, index) =>{
                                    var color = 'red';
                                    return(
                                        <ListItem key={index}>
                                            <View style={{flexDirection: 'row', width: '100%'}}>
                                                <View style={{alignItems: 'flex-start', width: '50%'}}>
                                                        <Text style={{fontWeight: 'bold'}}>
                                                            {item.name}:
                                                        </Text>
                                                </View>
                                                <View style={{alignItems: 'flex-end', width: '50%'}}>
                                                        <Text style={{color: color, fontWeight: 'bold'}}>
                                                            ${item.amount}
                                                        </Text>
                                                </View>
                                            </View>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </ScrollView>
                    </View>
                    <View style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: 'transparent'}}>
                        <AddButton action={this.showModal.bind(this)} colorPick="green"/>
                    </View>
                </View>
            </Container>
        )
    }
}

export default ExpenseOverview