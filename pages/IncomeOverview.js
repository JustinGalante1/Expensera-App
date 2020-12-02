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
import { SwipeRow } from 'react-native-swipe-list-view';

import { Feather } from '@expo/vector-icons'; 

//styles
import {PageStyle} from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
const styles = StyleSheet.flatten(PageStyle);

export class IncomeOverview extends Component {
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
            incomeArray: [],
            modal: false
        }
        this.incomeListener;
        this.openRowRefs=[];

        this.rowRef = React.createRef();
    }
    
    changeInfo(){
        if(this.incomeListener != undefined){
            this.incomeListener();
        }
        let currentComponent = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentComponent.incomeListener = firebase.firestore().collection(`/users/${user.email}/incomes`).where("month", "==", currentComponent.state.month).onSnapshot((querySnapshot)=>{
                    let totalIncome = 0;
                    let tempArray = [];
                    querySnapshot.forEach((doc) => {
                        totalIncome += parseFloat(doc.data().amount);
                        tempArray.push(doc);
                    });
                    tempArray.sort(function(a, b){
                        return (b.data().date.localeCompare(a.data().date));
                    })
                    currentComponent.setState({
                        incomeArray: tempArray
                    })
                    totalIncome = parseFloat(totalIncome).toFixed(2);
                    currentComponent.setState({incomeSum: totalIncome});
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
        let allEmpty = true;
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
                firebase.firestore().collection(`/users/${user.email}/incomes`).doc(item.id).delete().then(()=>{
                    console.log("successfully deleted income");
                })
                .catch((error) => {
                    console.log("problem while deleting income");
                })
            }
        });
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
                    <View style={[styles.centerContainer], {flex: 3}}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Card style={{backgroundColor: '#RRGGBBFF', width: windowWidth-20, alignItems: 'center', borderRadius: 20, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}>    
                                <ImageBackground source={require('../assets/up.png')} style={{alignItems: 'center', overflow: 'hidden', width: "100%", borderRadius: 20}}>    
                                    <CardItem header style = {styles.cardHeader, {backgroundColor: '#RRGGBBFF'}}>
                                    </CardItem>
                                    <CardItem style = {{backgroundColor: '#RRGGBBFF'}}>
                                        <Text style = {{fontSize: 30, fontWeight: 'bold'}}>
                                            You've Earned:
                                        </Text>
                                    </CardItem>
                                    <CardItem style = {{backgroundColor: '#RRGGBBFF'}}>
                                        <Text style={{color: '#00FF00', fontSize: 30, fontWeight: 'bold'}}>
                                            ${this.state.incomeSum}
                                        </Text>
                                    </CardItem>
                                    <CardItem style = {{backgroundColor: '#RRGGBBFF'}}>
                                        <Text style = {{fontSize: 30, fontWeight: 'bold'}}>
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
                                {this.state.incomeArray.map((item, index) =>{
                                    var color = "#2fc547";
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
export default IncomeOverview