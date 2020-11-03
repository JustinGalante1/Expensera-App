import React, {Fragment} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

//firebase
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyApGANbHIhs4wryjPyCUXXQwJgspRRlZLY",
  authDomain: "expensera.firebaseapp.com",
  databaseURL: "https://expensera.firebaseio.com",
  projectId: "expensera",
  storageBucket: "expensera.appspot.com",
  messagingSenderId: "83989428686",
  appId: "1:83989428686:web:61b7df23eebc5098f3139f",
  measurementId: "G-FLXMQPZRD9"
};

if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}

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
