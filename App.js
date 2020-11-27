import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

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

  authenticateUser(){
    this.setState({loggedIn: true});
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
        <NavigationContainer>
          <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name="Login">
              {props => <Login {...props} action={this.authenticateUser.bind(this)}/>} 
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => <Signup {...props} action={this.authenticateUser.bind(this)}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}