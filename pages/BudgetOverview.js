import React, { Component } from 'react'
import {StyleSheet, Dimensions} from 'react-native'

//native base
import {Card, Container, Button, Text, CardItem, View} from 'native-base';

import { firebase } from '../util/firebase';

import { SafeAreaView } from 'react-navigation';

//our components
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import BudgetModal from '../components/BudgetModal';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class BudgetOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: "January",
            expenseSum: 0,
            incomeSum: 0,
            budget: 0,
            netSpending: 0,
            percent: 0,
            remaining: 0,
            expenseData: [],
            modal: false
        }
    }
    componentDidMount(){
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});
        this.setState({month: month});
        this.update();
    }
    update(){
        let currentComponent = this;
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.firestore().collection(`/users/${user.email}/incomes`).get().then((data)=>{
                    let totalIncome = 0;
                    let dataExpenses = [];
                    data.forEach((doc) => {
                        totalIncome += doc.data().amount;
                        dataExpenses.push(doc.data());
                    });
                    currentComponent.setState({incomeSum: totalIncome});
                    currentComponent.setState({expenseData: dataExpenses});
                })
                .catch((error)=>{
                    console.log(error);
                });
                firebase.firestore().collection(`/users/${user.email}/expenses`).get().then((data)=>{
                    let dataExpenses = [];
                    let totalExpense = 0;
                    data.forEach((doc) => {
                        dataExpenses.push(doc.data());
                        totalExpense += doc.data().amount;
                    });
                    currentComponent.setState({expenseData: dataExpenses});
                    currentComponent.setState({expenseTotal: totalExpense});
                })
                .catch((error)=>{
                    console.log(error);
                });
                firebase.firestore().doc(`/users/${user.email}/budgets/${month}`).get().then((doc)=>{
                    currentComponent.setState({budget: doc.data().amount})
                })
                .catch((error)=>{
                    console.log(error);
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
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}>
                </SafeAreaView>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <Header navigation = {navigation}/>
                        <View style={styles.centerContainer}>
                            <View style={styles.centerContainer}>
                                <Card style={{width: windowWidth-20, borderRadius: 20}}>
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
                                            Net Spending: ${this.state.incomeSum - this.state.expenseTotal}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            % of Budget Used: {-100*((this.state.incomeSum - this.state.expenseTotal) / this.state.budget)}%
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}>
                                        <Text>
                                            Dollars Remaining: ${this.state.budget - this.state.netSpending}
                                        </Text>
                                    </CardItem>
                                </Card> 
                            </View>
                            <BudgetModal visible={this.state.modal} action={this.hideModal.bind(this)} update={this.update.bind(this)}/>
                            <AddButton action={this.showModal.bind(this)}/>
                        </View>
                </SafeAreaView>
            </Container>
        )
    }
}

export default BudgetOverview