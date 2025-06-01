import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStatusBar from '@/components/app-status-bar';
import { useRoute } from '@/navigation/navigation';
import Toolbar from './components/toolbar';
import CanvasView from './components/canvas-view/canvas-view';
import { CanvasProvider } from './provider/canvas-provider';
import CanvasViewBottomSheet from './components/canvas-bottom-sheet';

const CanvasPage = () => {
  const route = useRoute();

  return (
    <CanvasProvider route={route}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <AppStatusBar />

          <View style={{ flex: 1, backgroundColor: '#eee' }}>
            <CanvasView />

            <Toolbar />

            <CanvasViewBottomSheet />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </CanvasProvider>
  );
};

export default CanvasPage;
