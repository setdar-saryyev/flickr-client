import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import configureStore from './store';

import Navigator from './src/navigation';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <Navigator />
    </View>
  </Provider>
);
