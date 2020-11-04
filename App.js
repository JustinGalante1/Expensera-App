import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

//pages
import Home from './pages/Home';
import Login from './pages/Login';

//our components
import Drawer from './components/Drawer';

const Stack = createStackNavigator();

const screens = {
  Login:{
    screen: Login,
  },
  Home: {
    screen: Home,
  }
}

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    const loggedIn = this.state.loggedIn;
    if(loggedIn){
      return(
        <Drawer/>
      );
    }
    else{
      return(
        <Login/>
      );
    }
  }
}