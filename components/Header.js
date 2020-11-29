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

    const setMonth =(i) => {
        switch(i){
            case 0:
                props.setMonth("January");
                break;
            case 1:
                props.setMonth("February");
                break;
            case 2:
                props.setMonth("March");
                break;
            case 3:
                props.setMonth("April");
                break;
            case 4:
                props.setMonth("May");
                break;
            case 5:
                props.setMonth("June");
                break;
            case 6:
                props.setMonth("July");
                break;
            case 7:
                props.setMonth("August");
                break;
            case 8:
                props.setMonth("September");
                break;
            case 9:
                props.setMonth("October");
                break;
            case 10:
                props.setMonth("November");
                break;
            case 11:
                props.setMonth("December");
                break;                  
        }
    }

    return (
        <View style={[styles.headerContainer]}>
            <MaterialIcons name='menu' size={40} onPress={openMenu} style={styles.drawerIcon}/>
            <View>
                <Text style = {styles.title}>
                    Expensera
                </Text> 
            </View>
            <View style={{shadowColor: '#000', shadowOpacity: 0.5, shadowOffset: {width: 0, height: 6.0}, shadowRadius: 1}}> 
                <Tabs scrollWithoutAnimation={true} initialPage={new Date().getMonth()} onChangeTab={({i})=>{
                    setMonth(i);
                }} renderTabBar={()=> <ScrollableTab style={{backgroundColor: "black", borderWidth: 0}} underlineStyle={{backgroundColor: '#33d5ff'}}/>}>
                    <Tab heading="January" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="Februrary" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="March" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="April" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="May" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="June" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="July" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="August" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="September" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="October" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="November" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                    <Tab heading="December" tabStyle={{backgroundColor: "black"}} activeTabStyle={{backgroundColor: 'black'}} activeTextStyle={{color: '#33d5ff'}}/>
                </Tabs>
            </View>
        </View>
    )
}

export default Header
