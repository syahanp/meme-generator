import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import CanvasViewPage from './modules/canvas-view/canvas-view-page';
import { View } from 'react-native';
import HomePage from './modules/home/home-page';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomePage,
    // CanvasView: CanvasViewPage,
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
