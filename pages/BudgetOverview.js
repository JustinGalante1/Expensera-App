import React, { Component } from 'react'

import {Card, Container, Content, Text, CardItem, Icon, Right} from 'native-base';

export class BudgetOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Text>
                        BUDGET Overview - MONTH NAME (july)
                    </Text>
                </CardItem>
            </Card>
        )
    }
}

export default BudgetOverview