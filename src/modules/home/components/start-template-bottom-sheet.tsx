import BottomSheetCustomBackdrop from '@/components/bottom-sheet-custom-backdrop';
import BottomSheetTitle from '@/components/bottom-sheet-title';
import Button from '@/components/button';
import theme from '@/theme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC } from 'react';
import { Image, ScrollView, View } from 'react-native';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
  imgSrc: string;
  onClose?: () => void;
}

const StartTemplateBottomSheet: FC<Props> = ({ sheetRef, imgSrc, onClose }) => {
  const handleStart = () => {
    sheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[420]}
      index={-1}
      enablePanDownToClose
      backdropComponent={BottomSheetCustomBackdrop}
    >
      <ScrollView
        style={{ height: '100%', paddingHorizontal: 20, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <BottomSheetTitle
          sheetRef={sheetRef}
          title="Template"
          onClose={onClose}
        />

        <BottomSheetView style={{ flexDirection: 'column', gap: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={imgSrc as any}
              resizeMode="contain"
              style={{
                height: 260,
                aspectRatio: 1,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.colors.grey[300],
              }}
            />
          </View>

          <Button onPress={handleStart}>Start With This Template</Button>
        </BottomSheetView>
      </ScrollView>
    </BottomSheet>
  );
};

export default StartTemplateBottomSheet;
