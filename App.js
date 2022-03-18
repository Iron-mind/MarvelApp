import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home.js'

const Stack = createStackNavigator();
import Detail from './components/Detail.js';

export default function App() {
  return (
    <NavigationContainer style={{backgroundColor:"#FF495C"}}>
      <Stack.Navigator>
        <Stack.Screen name="MarvelApp" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
