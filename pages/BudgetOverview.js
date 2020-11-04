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

export class BudgetOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
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

export default BudgetOverview