import Button from '@/components/button';
import theme from '@/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppStatusBar from '@/components/app-status-bar';
import { useNavigation } from '@/navigation/navigation';
import StartTemplateBottomSheet from './components/start-template-bottom-sheet';
import TemplateGallery from './components/template-gallery';

const HomePage = () => {
  const navigation = useNavigation();
  const templateConfirmSheetRef = useRef<BottomSheet>(null);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSelectTemplate = (image: string) => {
    setSelectedImage(image);
    templateConfirmSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    templateConfirmSheetRef.current?.close();
    setSelectedImage('');
  };

  const handleStartBlankCanvas = () => {
    navigation.navigate('CanvasView');
  };
  const handleStartWithTemplate = () => {
    navigation.navigate('CanvasView', { template: selectedImage });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AppStatusBar />

        <View
          style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 16 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              marginTop: 16,
              paddingVertical: 28,
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: 700 }}>
              Welcome to Meme Generator
            </Text>
            <Text style={{ fontSize: 18, color: theme.colors.grey[600] }}>
              Make your own Meme, uniquely yours!
            </Text>
          </View>

          <Button onPress={handleStartBlankCanvas}>
            Start with Blank Canvas
          </Button>

          <View style={{ paddingVertical: 24 }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: theme.colors.grey[900],
              }}
            >
              Or start with our templates below
            </Text>
          </View>

          <TemplateGallery onSelectTemplate={handleSelectTemplate} />
        </View>

        <StartTemplateBottomSheet
          sheetRef={templateConfirmSheetRef}
          templateKey={selectedImage}
          onClose={handleCloseSheet}
          onSubmit={handleStartWithTemplate}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default HomePage;
