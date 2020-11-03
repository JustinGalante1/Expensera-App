import React, { Component } from 'react'

import {Card, Container, Content, Text, CardItem, Icon, Right} from 'native-base';

export class Home extends Component {
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
                        Overview - MONTH NAME
                    </Text>
                </CardItem>
            </Card>
        )
    }
}

export default Home
