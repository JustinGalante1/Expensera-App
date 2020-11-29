import React from 'react'
import {StyleSheet} from 'react-native';

import {Text, View, Tab, Tabs, ScrollableTab} from 'native-base';

import {MaterialIcons} from '@expo/vector-icons';

import { HeaderStyle } from '../styles';
const styles = StyleSheet.flatten(HeaderStyle);

const Header = (props) => {
    const navigation = props.navigation;

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={[styles.headerContainer]}>
            <MaterialIcons name='menu' size={40} onPress={openMenu} style={styles.drawerIcon}/>
            <View>
                <Text style = {styles.title}>
                    Expensera
                </Text> 
            </View>
            <View style={{shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1,}}> 
                <Tabs renderTabBar={()=> <ScrollableTab style={{backgroundColor: "black"}} underlineStyle={{backgroundColor: '#33d5ff'}} />}>
                    <Tab heading="January" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="Februrary" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="March" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="April" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="May" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="June" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="July" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="August" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="September" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="October" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="November" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                    <Tab heading="December" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}}>
                    </Tab>
                </Tabs>
            </View>
        </View>
    )
}

export default Header
