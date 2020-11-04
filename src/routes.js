import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from './pages/Feed';

import Header from './components/Header';

const Routes = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerBackTitle: false,
          header: (props) => <Header />,
        }}
        headerMode="screen"
      >
        <Screen name="Feed" component={Feed} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
