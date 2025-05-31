import Button from '@/components/button';
import { imagePath } from '@/constants/images';
import theme from '@/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StartTemplateBottomSheet from './components/start-template-bottom-sheet';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const spacing = 8;
const imageSize = (screenWidth - spacing - 12 * (numColumns + 1)) / numColumns;

const HomePage = () => {
  const templateConfirmSheetRef = useRef<BottomSheet>(null);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    templateConfirmSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    templateConfirmSheetRef.current?.close();
    setSelectedImage('');
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
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
              Make your own Meme, uniqiuely yours!
            </Text>
          </View>

          <Button>Start with Blank Canvas</Button>

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

          <FlatList
            data={Object.values(imagePath)}
            keyExtractor={item => item}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectImage(item)}
                style={{
                  margin: spacing / 2,
                }}
              >
                <Image
                  source={item}
                  resizeMode="contain"
                  style={{
                    width: imageSize,
                    height: imageSize,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: theme.colors.grey[400],
                  }}
                />
              </Pressable>
            )}
          />
        </View>

        <StartTemplateBottomSheet
          sheetRef={templateConfirmSheetRef}
          imgSrc={selectedImage}
          onClose={handleCloseSheet}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default HomePage;
