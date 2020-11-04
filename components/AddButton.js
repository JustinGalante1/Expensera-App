import React, { Component } from 'react';
import {Image, Modal} from 'react-native';
import { firebase } from '../util/firebase';

//native base
import {View, Button, Text} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class AddButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
    }

    handlePress(){
        console.log("button pressed");
        this.props.action();
    }

    render() {
        return (
            <View style={{flex: .4, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={()=>this.handlePress()}>
                    <Image source={require('../assets/whiteAddFinal.png')} style={{flex: 1, width: 175, height: 175, alignSelf:'flex-end', left: 40, top: 40}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddButton
