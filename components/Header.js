import React from 'react'
import {StyleSheet} from 'react-native';

import {Text, View} from 'native-base';

import { HeaderStyle } from '../styles';
const styles = StyleSheet.flatten(HeaderStyle);

const Header = (props) => {
    const { navigation } = props.navigation;
    return (
        <View style={styles.headerContainer}>
            <Text style = {styles.title}>
                Expensera
            </Text>
        </View>
    )
}

export default Header
