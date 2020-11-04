import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { firebase } from '../util/firebase';

//native-base
import {Card, Container, Content, Text, View, Button} from 'native-base';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class Signup extends Component {
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

    signup = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.props.action;
            console.log("succesfully created user");
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
                console.log("successfully logged in");
                this.props.action();
            })
        }).catch((error)=>{
            console.log(error);
        });
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#2fc547'}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <Text>
                        SIGNUP
                    </Text>
                    <View>
                        <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor = "#4a4a4a" onChangeText={this.handleEmail}/>
                    </View>
                    <View>
                        <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor = "#4a4a4a" onChangeText={this.handlePassword}/>
                    </View>
                    <View>
                        <Button onPress = {this.signup}>
                            <Text>
                                Submit
                            </Text>
                        </Button>
                        <Button rounded info onPress={()=>navigation.navigate('Login')}>
                            <Text>
                                Login
                            </Text>
                        </Button>
                    </View>
                </SafeAreaView>
            </Container>
        )
    }
}

export default Signup
