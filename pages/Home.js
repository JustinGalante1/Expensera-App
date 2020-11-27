import React, { Component } from 'react';
import {StyleSheet, Dimensions, TouchableHighlightBase,} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { firebase } from '../util/firebase';

//native base
import {Card, Container, Button, Text, CardItem, View} from 'native-base';

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
            month: "January",
            expenseSum: 0,
            incomeSum: 0,
            budget: 0,
            netSpending: 0,
            percent: 0,
            remaining: 0,
            modal: false,     
        }
    }

    componentDidMount(){
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});
        this.setState({month: month});
        let currentComponent = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.firestore().collection(`/users/${user.email}/expenses`).onSnapshot((querySnapshot)=>{
                    let totalExpense = 0;
                    querySnapshot.forEach((doc) => {
                        totalExpense += doc.data().amount;
                    });
                    currentComponent.setState({expenseSum: totalExpense});
                })

                firebase.firestore().collection(`/users/${user.email}/incomes`).onSnapshot((querySnapshot)=>{
                    let totalIncome = 0;
                    querySnapshot.forEach((doc) => {
                        totalIncome += doc.data().amount;
                    });
                    currentComponent.setState({incomeSum: totalIncome});
                })

                firebase.firestore().doc(`/users/${user.email}/budgets/${month}`).onSnapshot((doc) => {
                    if(!doc.exists){
                        //i'll figure this out later
                        console.log(month);
                        console.log("budget doesnt exist");
                    }
                    else{
                        currentComponent.setState({budget: doc.data().amount});
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
                                            Net Spending: {this.state.incomeSum - this.state.expenseSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Income: {this.state.incomeSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Logged Expenses: {this.state.expenseSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}/>
                                </Card> 
                            </View>
                            <MyModal visible={this.state.modal} action={this.hideModal.bind(this)}/>
                            <View style={styles.centerContainer}>
                                <Card style={{width: windowWidth-20, borderRadius: 20}}>
                                    <CardItem header bordered style={styles.cardHeader}>
                                        <Text style={{color: '#1ef442'}}>
                                            Budget - {this.state.month}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text style={{fontSize: 18}}>
                                            This Month's Budget: {this.state.budget} 
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            Net Spending: {this.state.incomeSum - this.state.expenseSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Text>
                                            % of Budget Used: {-100*(this.state.incomeSum - this.state.expenseSum)/this.state.budget}%
                                        </Text>
                                    </CardItem>
                                    <CardItem footer bordered style={styles.cardFooter}/>
                                </Card> 
                            </View>
                            <AddButton action={this.showModal.bind(this)}/>
                        </View>
                </SafeAreaView>
            </Container>
            
        )
    }
}

export default Home
