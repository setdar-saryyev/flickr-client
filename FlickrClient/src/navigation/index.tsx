import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ImageSearch from '../views/ImageSearch';
import ImageDetails from '../views/ImageDetails';

const Stack = createStackNavigator();

export default class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'ImageSearch'}
            component={ImageSearch}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ImageDetails'}
            component={ImageDetails}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
