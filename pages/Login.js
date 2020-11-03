import React, { Component } from 'react'

//native-base
import {Card, Container, Content, Text, CardItem, Icon, Right} from 'native-base';

//our components
import Header from '../components/Header';

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Header navigation = {this.props}/>
                <Content>
                    <Card>
                        <CardItem button onPress = {()=>navigation.navigate('Home')}>
                            <Text>
                                LOGIN
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
            
        )
    }
}

export default Login
