import React from 'react'
import {StyleSheet} from 'react-native';

import {Text, View} from 'native-base';

import {MaterialIcons} from '@expo/vector-icons';

import { HeaderStyle } from '../styles';
const styles = StyleSheet.flatten(HeaderStyle);

const Header = (props) => {
    const navigation = props.navigation;

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.headerContainer}>
            <MaterialIcons name='menu' size={40} onPress={openMenu} style={styles.drawerIcon}/>
            <View>
                <Text style = {styles.title}>
                    Expensera
                </Text> 
            </View>
        </View>
    )
}

export default Header
