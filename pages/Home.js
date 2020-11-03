import React, { Component } from 'react'

import {Card, Container, Content, Text, CardItem} from 'native-base';

//our components
import Header from '../components/Header';

export class Home extends Component {
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
                <Content>
                    <Card>
                        <CardItem button onPress={()=>console.log("hi")}>
                            <Text>
                                HOME SCREEN
                            </Text>
                        </CardItem>
                    </Card> 
                </Content>
                
            </Container>
            
        )
    }
}

export default Home
