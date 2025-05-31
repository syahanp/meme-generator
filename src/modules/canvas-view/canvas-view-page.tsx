import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Toolbar from './components/toolbar';
import CanvasContainer from './components/playground/canvas-container';
import { CanvasProvider } from './provider/canvas-provider';
import CanvasViewBottomSheet from './components/canvas-view-bottom-sheet';

const CanvasViewPage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <CanvasProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />

          <View style={{ flex: 1, backgroundColor: '#eee' }}>
            <CanvasContainer />

            <Toolbar />

            <CanvasViewBottomSheet />
          </View>
        </CanvasProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default CanvasViewPage;
