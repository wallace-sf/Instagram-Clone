import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import './config/reactotronConfig';

import Routes from './routes';

const App = () => (
  <>
    <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
    <Routes />
  </>
);

export default App;
