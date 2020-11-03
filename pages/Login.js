import React, { Component } from 'react'

//native-base
import {Card, Container, Content, Text, CardItem, Icon, Right} from 'native-base';

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <Card>
                <CardItem button onPress = {()=>navigation.navigate('Home')}>
                    <Text>
                        LOGIN
                    </Text>
                </CardItem>
            </Card>
        )
    }
}

export default Login
