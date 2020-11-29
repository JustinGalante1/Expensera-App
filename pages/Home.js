import React, { Component } from 'react';
import {StyleSheet, Dimensions, TouchableHighlightBase,} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { firebase } from '../util/firebase';

//native base
import {Card, Container, Button, Text, CardItem, View, ScrollableTab} from 'native-base';

//our components
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import MyModal from '../components/MyModal';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: 'ree',
            expenseSum: 0,
            incomeSum: 0,
            budget: 0,
            remaining: 0,
            modal: false,     
        }
    }

    updateBudget = () => {
        let currentComponent = this;
        if(parseFloat(currentComponent.state.budget) > 0){
            console.log("hi");
            currentComponent.setState({
                percent: (100*(currentComponent.state.expenseSum - currentComponent.state.incomeSum)/(currentComponent.state.budget)).toFixed(2)
            })
        }
        else{
            currentComponent.setState({
                percent: 'N/A'
            })
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
                    querySnapshot.forEach((doc) => {
                        totalExpense += parseFloat(doc.data().amount);
                    });
                    totalExpense = parseFloat(totalExpense).toFixed(2);
                    currentComponent.setState({expenseSum: totalExpense});

                    currentComponent.updateBudget();
                })

                firebase.firestore().collection(`/users/${user.email}/incomes`).where("month", "==", month).onSnapshot((querySnapshot)=>{
                    let totalIncome = 0;
                    querySnapshot.forEach((doc) => {
                        totalIncome += parseFloat(doc.data().amount);
                    });
                    totalIncome = parseFloat(totalIncome).toFixed(2);
                    currentComponent.setState({incomeSum: totalIncome});

                    currentComponent.updateBudget();
                })

                firebase.firestore().doc(`/users/${user.email}/budgets/${month}`).onSnapshot((doc) => {
                    if(!doc.exists){
                        currentComponent.setState({budget: 'No Budget'})
                        currentComponent.setState({percent: 'N/A'})
                        console.log("budget doesnt exist");
                    }
                    else{
                        currentComponent.setState({budget: doc.data().amount});
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

        if(parseFloat(this.state.expenseSum) - parseFloat(this.state.incomeSum) > 0){
            var spendingColor = "red";
        }
        else{
            var spendingColor = "#2fc547";
        }

        if(parseFloat(this.state.percent) < 66){
            var percentColor = "#2fc547";
        }
        else{
            var percentColor = "red";
        }

        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}>
                </SafeAreaView>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <View style={{flex: .15, backgroundColor: 'black'}}>
                        <Header navigation = {navigation}/>
                    </View>
                        <View style={styles.centerContainer}>
                            <View style={styles.centerContainer}>
                                <Card style={{width: windowWidth-20, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}>
                                    <CardItem header bordered style={styles.cardHeader}>
                                        <Text style={{color: '#1ef442'}}>
                                            Overview - {this.state.month}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Net Spending:{' '}
                                        </Text>
                                        <Text style={{color: spendingColor}}>
                                            ${this.state.expenseSum - this.state.incomeSum}
                                        </Text>

                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Income:{' '}
                                        </Text>
                                        <Text style={{color:"#2fc547"}}>
                                            ${this.state.incomeSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Expenses:{' '}
                                        </Text>
                                        <Text style={{color: 'red'}}>
                                            ${this.state.expenseSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}/>
                                </Card> 
                            </View>
                            <MyModal visible={this.state.modal} action={this.hideModal.bind(this)}/>
                            <View style={styles.centerContainer}>
                                <Card style={{width: windowWidth-20, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}>
                                    <CardItem header bordered style={styles.cardHeader}>
                                        <Text style={{color: '#1ef442'}}>
                                            Budget - {this.state.month}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            This Month's Budget:{' '}
                                        </Text>
                                        <Text style={{color: '#33d5ff'}}>
                                            ${this.state.budget}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            <Text>
                                                Net Spending:{' '}
                                            </Text>
                                            <Text style={{color: spendingColor}}>
                                                ${this.state.expenseSum - this.state.incomeSum}
                                            </Text>
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            % of Budget Used:{' '}
                                        </Text>
                                        <Text style={{color: percentColor}}>
                                            {this.state.percent}%
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}/>
                                </Card> 
                            </View>
                            <View style={{flex: .5, width: '100%', justifyContent: 'flex-end', right: 10}}>
                                <AddButton action={this.showModal.bind(this)} colorPick="white"/>
                            </View>
                            
                        </View>
                </SafeAreaView>
            </Container>
            
        )
    }
}

export default Home
