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

import { SwipeRow } from 'react-native-swipe-list-view';

import { Feather } from '@expo/vector-icons'; 

//styles
import {PageStyle} from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
const styles = StyleSheet.flatten(PageStyle);

export class BudgetOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: new Date().toLocaleString('default', {month: 'long'}),
            expenseSum: 0,
            incomeSum: 0,
            budget: 0,
            remaining: 0,
            modal: false,
            expenseArray: [],
            incomeArray: [],
            bothArray: [],
        }
        this.incomeListener;
        this.expenseListener;
        this.budgetListener;
        this.openRowRefs=[];

        this.rowRef = React.createRef();
    }

    updateArray = () =>{
        let currentComponent = this;
        let tempArray2 = currentComponent.state.expenseArray.concat(currentComponent.state.incomeArray);
        tempArray2.sort(function(a, b){
            return (b.data().name.localeCompare(a.data().name));
        })

        currentComponent.setState({
            bothArray: tempArray2,
        })
    }

    changeInfo(){
        if(this.budgetListener != undefined){
            console.log("removing old budget listener");
            this.budgetListener();
        }

        if(this.expenseListener != undefined){
            console.log("removing old expense listener");
            this.expenseListener();
        }

        if(this.incomeListener != undefined){
            console.log("removing old income listener");
            this.incomeListener();
        }

        let currentComponent = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {        
                currentComponent.expenseListener = firebase.firestore().collection(`/users/${user.email}/expenses`).where("month", "==", currentComponent.state.month).onSnapshot((querySnapshot)=>{
                    let totalExpense = 0;
                    let tempArray = [];
                    querySnapshot.forEach((doc) => {
                        totalExpense += parseFloat(doc.data().amount);
                        tempArray.push(doc);
                    });
                    currentComponent.setState({
                        expenseArray: tempArray,
                    });
 
                    totalExpense = parseFloat(totalExpense).toFixed(2);
                    currentComponent.setState({expenseSum: totalExpense});

                    currentComponent.updateArray();

                    if(parseFloat(currentComponent.state.budget) > 0){
                        currentComponent.setState({
                            percent: (100*(currentComponent.state.expenseSum - currentComponent.state.incomeSum)/(currentComponent.state.budget)).toFixed(2)
                        })
                    }
                    else{
                        currentComponent.setState({
                            percent: 'N/A'
                        })
                    }
                });

                currentComponent.incomeListener = firebase.firestore().collection(`/users/${user.email}/incomes`).where("month", "==", currentComponent.state.month).onSnapshot((querySnapshot)=>{
                    let totalIncome = 0;
                    let tempArray = [];
                    querySnapshot.forEach((doc) => {
                        totalIncome += parseFloat(doc.data().amount);
                        tempArray.push(doc);
                    });
                    currentComponent.setState({
                        incomeArray: tempArray
                    })
                    
                    totalIncome = parseFloat(totalIncome).toFixed(2);
                    currentComponent.setState({incomeSum: totalIncome});
                    
                    currentComponent.updateArray();
                    
                    if(parseFloat(currentComponent.state.budget) > 0){
                        currentComponent.setState({
                            percent: (100*(currentComponent.state.expenseSum - currentComponent.state.incomeSum)/(currentComponent.state.budget)).toFixed(2)
                        })
                    }
                    else{
                        currentComponent.setState({
                            percent: 'N/A'
                        })
                    }
                });
                

                currentComponent.budgetListener = firebase.firestore().doc(`/users/${user.email}/budgets/${currentComponent.state.month}`).onSnapshot((doc) => {
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

    closeAllOpenRows(index){
        allEmpty = true;
        for(var x=0;x<this.openRowRefs.length;x++){
            if(this.openRowRefs[x]){
                allEmpty = false;
            }
            this.openRowRefs[x] && this.openRowRefs[x].closeRow();
        }
        if(allEmpty){
            this.openRowRefs = [];
        }
    }

    deleteDoc(item, index){
        this.closeAllOpenRows(index);
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                if(item.data().isExpense){
                    firebase.firestore().collection(`/users/${user.email}/expenses`).doc(item.id).delete().then(()=>{
                        console.log("successfully deleted expense");
                    })
                    .catch((error) =>{
                        console.log("problem while deleting expense");
                    });
                }
                else{
                    firebase.firestore().collection(`/users/${user.email}/incomes`).doc(item.id).delete().then(()=>{
                        console.log("successfully deleted income");
                    })
                    .catch((error) => {
                        console.log("problem while deleting income");
                    })
                }
            }
        });
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

        if((parseFloat(this.state.budget) - (parseFloat(this.state.expenseSum) - parseFloat(this.state.incomeSum))) > 0){
            var remainingColor = "#2fc547";
        }
        else{
            var remainingColor = "red";
        }

        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <View style={{flex: 1}}>
                        <Header navigation = {navigation} setMonth={this.setMonth.bind(this)}/>
                    </View>
                    <View style={[styles.centerContainer], {flex: 2.5}}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Card style={{width: windowWidth-20, borderRadius: 20, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}>
                                <CardItem header bordered style={styles.cardHeader}>
                                    <Text style={{color: '#1ef442'}}>
                                        Overview - {this.state.month}
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
                                        Net Spending:{' '}
                                    </Text>
                                    <Text style={{color: spendingColor}}>
                                        ${this.state.expenseSum - this.state.incomeSum}
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
                                <CardItem footer bordered style={styles.cardFooter}>
                                    <Text style={{color: 'black'}}>
                                        Dollars Remaining:{' '} 
                                    </Text>
                                    <Text style={{color: remainingColor}}>
                                        ${(this.state.budget - (this.state.expenseSum - this.state.incomeSum)).toFixed(2)}
                                    </Text>
                                </CardItem>
                            </Card>
                        </View> 
                        <BudgetModal visible={this.state.modal} action={this.hideModal.bind(this)}/>
                    </View>
                </SafeAreaView>
                <View style={{flex: 1, width: '100%', position: 'relative'}}>
                    <View style={{flexDirection: 'row', height: '100%', backgroundColor: 'red'}}>
                        <View style={{position: 'absolute', left: 0, backgroundColor: 'white', width: '50%', height: '100%'}}/>
                        <View style={{position: 'absolute', right: 0, backgroundColor: '#dcdcdc', width: '50%', height: '100%'}}/>
                        <ScrollView style={{width: '100%', backgroundColor: 'transparent'}} scrollEnabled={!this.state.isSwiping}>
                            <List>
                                {this.state.bothArray.map((item, index) =>{
                                    if(!item.data().isExpense){
                                        var color = "#2fc547";
                                    }
                                    else{
                                        var color = 'red';
                                    }
                                    return(
                                        <View style={{flexDirection: 'row', width: '100%'}} key={index}>
                                            <ListItem>
                                                <View style={{width: '50%'}}>
                                                    <Text>{item.data().name}</Text>
                                                </View>
                                                <SwipeRow ref={(ref) => {this.openRowRefs[index] = ref}} preview={true} previewOpenValue={55} leftOpenValue={55} disableLeftSwipe={true} stopLeftSwipe={75} style={{width: '50%', height: 50}}>
                                                    <View style={slideStyles.standaloneRowBack}>
                                                        <Feather name="trash-2" size={24} color="red" style={{left: 10}} onPress={()=>{
                                                            this.deleteDoc(item, index);
                                                        }}/>
                                                    </View>
                                                    <View style={slideStyles.standaloneRowFront}>
                                                        <Text style={{color: color, fontWeight: 'bold'}}>${item.data().amount}</Text>
                                                    </View>
                                                </SwipeRow>
                                            </ListItem>
                                        </View>
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

const slideStyles = StyleSheet.create({
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default BudgetOverview