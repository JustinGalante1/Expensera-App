import React, { Component } from 'react'
import {StyleSheet} from 'react-native'

//native base
import {Container, Button, Text} from 'native-base';

import { firebase } from '../util/firebase';

import { SafeAreaView } from 'react-navigation';

//our components
import Header from '../components/Header';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class IncomeOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    componentDidMount(){
        const d = new Date();
        const month = d.toLocaleString('default', {month: 'long'});
        this.setState({month: month});
        let currentComponent = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.firestore().collection(`/users/${user.email}/incomes`).get().then((data)=>{
                    let totalIncome = 0;
                    let namesIncome = [];
                    let amountsIncome = [];
                    data.forEach((doc) => {
                        totalIncome += doc.data().amount;
                        namesIncome.push(doc.data().name);
                        amountsIncome.push(doc.data().amount);
                    });
                    currentComponent.setState({incomeSum: totalIncome});
                })
                .catch((error)=>{
                    console.log(error);
                });
            } else {
                // No user is signed in.
            }
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#4a4a4a'}}>
                </SafeAreaView>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <Header navigation = {navigation}/>
                </SafeAreaView>
            </Container>
            
        )
    }
}

export default IncomeOverview