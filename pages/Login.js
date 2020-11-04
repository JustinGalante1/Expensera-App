import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { firebase } from '../util/firebase';

//native-base
import {Card, Container, Content, Text, View, Button} from 'native-base';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email: '',
             password: ''
        }
    }

    handleEmail = (text) => {
        this.setState({email: text});
    }

    handlePassword = (text) => {
        this.setState({password: text});
    }

    login = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            console.log("successfully logged in");
            this.props.action();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {navigation} = this.props;
        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#2fc547'}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <Text>
                        LOGIN
                    </Text>
                    <View>
                        <TextInput style={styles.textInputLogin} placeholder="Email" placeholderTextColor = "#4a4a4a" onChangeText={this.handleEmail}/>
                    </View>
                    <View>
                        <TextInput style={styles.textInputLogin} placeholder="Password" placeholderTextColor = "#4a4a4a" onChangeText={this.handlePassword}/>
                    </View>
                    <View>
                        <Button onPress = {this.login}>
                            <Text>
                                Submit
                            </Text>
                        </Button>
                        <Button rounded info onPress={()=>navigation.navigate('Signup')}>
                            <Text>
                                Signup
                            </Text>
                        </Button>
                    </View>
                </SafeAreaView>
            </Container>
        )
    }
}

export default Login
