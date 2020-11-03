import React, { Component } from 'react'

import {Card, Container, Content, Text, CardItem, Icon, Right} from 'native-base';

//our components
import Header from '../components/Header';

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
                <Header navigation = {navigation}/>
                <Card>
                    <CardItem>
                        <Text>
                            BUDGET OVERVIEW
                        </Text>
                    </CardItem>
                </Card>
            </Container>
            
        )
    }
}

export default BudgetOverview