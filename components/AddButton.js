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

        var images = [
            require('../assets/whiteAddFinal.png'),
            require('../assets/greenAddFinal.png'),
        ]

        var index = 0;

        if(this.props.colorPick == "green"){
            var index = 1;
        }

        return (
            <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={()=>this.handlePress()} style={{height: 70, width: 70, alignItems: 'center', alignContent: 'center'}}>
                    <Image source={images[index]} style={{flex: 1, width: 175, height: 175, alignSelf: 'center', left: 5, top: 2}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddButton
