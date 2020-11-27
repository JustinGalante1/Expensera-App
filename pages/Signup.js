import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { firebase } from '../util/firebase';

//native-base
import {Card, Container, Content, Text, View, Button, H1, Item, Input} from 'native-base';

//styles
import {PageStyle} from '../styles';
const styles = StyleSheet.flatten(PageStyle);

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email: '',
             password: '',
             name: '',
             message: '',
        }
    }

    handleEmail = (text) => {
        this.setState({email: text});
    }

    handlePassword = (text) => {
        this.setState({password: text});
    }

    handleName = (text) => {
        this.setState({name: text})
    }

    signup = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.props.action;
            console.log("succesfully created user");

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
                console.log("successfully logged in");
                var user = firebase.auth().currentUser;

                const userCredentials = {
                    name: this.state.name,
                    email: user.email,
                    userId: user.uid,
                    createdAt: new Date().toISOString(),
                }

                firebase.firestore().doc(`/users/${user.email}`).set(userCredentials);
                this.props.action();
            })
        }).catch((error)=>{
            this.setState({message: 'Could not create user'})
            console.log(error);
        });
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <SafeAreaView style={{flex: 0, backgroundColor: '#2fc547'}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: '#2fc547'}}>
                    <View style={{flex:.5, alignContent: 'center', alignSelf: 'center'}}>
                        <H1 style={styles.titleText}>
                            Expensera
                        </H1>
                    </View>
                    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>
                            {this.state.message}
                        </Text>
                        <Item rounded style={styles.textInputLogin}>
                            <Input placeholder='Email' onChangeText={this.handleEmail}></Input>
                        </Item>
                        <Item rounded style={styles.textInputLogin}>
                            <Input placeholder='Password' onChangeText={this.handlePassword}></Input>
                        </Item>
                        <View style={{alignItems: 'center', alignContent: 'center'}}>
                            <Button rounded dark onPress = {this.signup} style={{margin: 10, alignSelf: 'center'}}>
                                <Text>
                                    Signup
                                </Text>
                            </Button>
                            <Text style={{color: 'white'}}>
                                Already have an account?
                            </Text>
                            <Button rounded primary onPress={()=>navigation.navigate('Login')} style={{margin: 10, alignSelf: 'center'}}>
                                <Text>
                                    Login
                                </Text>
                            </Button>
                        </View>
                    </View>                    
                </SafeAreaView>
            </Container>
        )
    }
}

export default Signup
