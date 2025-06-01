import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import HomePage from './modules/home/home-page';
import CanvasPage from './modules/canvas/canvas-page';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomePage,
    CanvasView: {
      screen: CanvasPage,
      options: {
        title: 'Meme Generator',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}
