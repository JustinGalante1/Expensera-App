import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//pages
import Home from './pages/Home';
import Login from './pages/Login';

//our components
import Drawer from './components/Drawer';
import Header from './components/Header';

const Stack = createStackNavigator();

const screens = {
  Login:{
    screen: Login,
  },
  Home: {
    screen: Home,
  }
}

export default function App() {
  return (
    <Drawer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
