import React, { Component } from 'react'
import {StyleSheet, Dimensions} from 'react-native'

//native base
import {Card, Container, Button, Text, CardItem, View, List, ListItem} from 'native-base';

import { firebase } from '../util/firebase';

import { SafeAreaView } from 'react-navigation';

//our components
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import BudgetModal from '../components/BudgetModal';

//styles
import {PageStyle} from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
const styles = StyleSheet.flatten(PageStyle);

export class BudgetOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: "January",
            expenseSum: 0,
            incomeSum: 0,
            budget: 0,
            remaining: 0,
            modal: false,
            expenseArray: [],
            incomeArray: [],
            bothArray: [],
        }
    }
    componentDidMount(){
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});
        this.setState({month: month});
        let currentComponent = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {                
                firebase.firestore().collection(`/users/${user.email}/expenses`).where("month", "==", month).onSnapshot((querySnapshot)=>{
                    let totalExpense = 0;
                    let tempArray = [];
                    querySnapshot.forEach((doc) => {
                        totalExpense += parseFloat(doc.data().amount);
                        tempArray.push(doc.data());
                    });
                    currentComponent.setState({
                        expenseArray: tempArray,
                    });
 
                    totalExpense = parseFloat(totalExpense).toFixed(2);
                    console.log(totalExpense);
                    currentComponent.setState({expenseSum: totalExpense});
                });

                firebase.firestore().collection(`/users/${user.email}/incomes`).where("month", "==", month).onSnapshot((querySnapshot)=>{
                    let totalIncome = 0;
                    let tempArray = [];
                    querySnapshot.forEach((doc) => {
                        totalIncome += parseFloat(doc.data().amount);
                        tempArray.push(doc.data());
                    });
                    currentComponent.setState({
                        incomeArray: tempArray
                    })
                    
                    totalIncome = parseFloat(totalIncome).toFixed(2);
                    console.log(totalIncome);
                    currentComponent.setState({incomeSum: totalIncome});

                    let tempArray2 = currentComponent.state.expenseArray.concat(currentComponent.state.incomeArray);
                    tempArray2.sort(function(a, b){
                        return (b.date.localeCompare(a.date));
                    })

                    currentComponent.setState({
                        bothArray: tempArray2,
                    })
                });
                

                firebase.firestore().doc(`/users/${user.email}/budgets/${month}`).onSnapshot((doc) => {
                    if(!doc.exists){
                        currentComponent.setState({budget: 'No Budget'});
                        currentComponent.setState({percent: 'N/A'});
                        console.log("budget doesnt exist");
                    }
                    else{
                        let cleanBudget = doc.data().amount;
                        cleanBudget = parseFloat(cleanBudget).toFixed(2);
                        currentComponent.setState({budget: cleanBudget});
                        currentComponent.setState({
                            percent: (100*(currentComponent.state.expenseSum - currentComponent.state.incomeSum)/(currentComponent.state.budget)).toFixed(2)
                        })
                    }
                })

            } else {
                // No user is signed in.
            }
        });
    }

    showModal(){
        console.log("showing modal");
        this.setState({modal: true});
    }

    hideModal(){
        console.log("hiding modal");
        this.setState({modal: false});
    }

    render() {
        const { navigation } = this.props;
        const windowWidth = Dimensions.get('window').width;
        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <Header navigation = {navigation}/>
                        <View style={styles.centerContainer}>
                            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                <Card style={{width: windowWidth-20, borderRadius: 20, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}>
                                    <CardItem header bordered style={styles.cardHeader}>
                                        <Text style={{color: '#1ef442'}}>
                                            Overview - {this.state.month}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            This Month's Budget: ${this.state.budget}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Net Spending: ${this.state.expenseSum - this.state.incomeSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            % of Budget Used: {this.state.percent}%
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}>
                                        <Text>
                                            Dollars Remaining: ${this.state.budget - (this.state.expenseSum - this.state.incomeSum)}
                                        </Text>
                                    </CardItem>
                                </Card>
                            </View> 
                            <BudgetModal visible={this.state.modal} action={this.hideModal.bind(this)}/>
                        </View>
                </SafeAreaView>
                <View style={{flex: 1.4, width: '100%', position: 'relative'}}>
                    <View style={{flexDirection: 'row', height: '100%', backgroundColor: 'red'}}>
                        <View style={{position: 'absolute', left: 0, backgroundColor: 'white', width: '50%', height: '100%'}}/>
                        <View style={{position: 'absolute', right: 0, backgroundColor: '#dcdcdc', width: '50%', height: '100%'}}/>
                        <ScrollView style={{width: '100%', backgroundColor: 'transparent'}}>
                            <List>
                                {this.state.bothArray.map((item, index) =>{
                                    if(!item.isExpense){
                                        var color = "#2fc547";
                                    }
                                    else{
                                        var color = 'red';
                                    }
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

export default BudgetOverview