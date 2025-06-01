import BottomSheetCustomBackdrop from '@/components/bottom-sheet-custom-backdrop';
import BottomSheetTitle from '@/components/bottom-sheet-title';
import Button from '@/components/button';
import { imagePath } from '@/constants/images';
import theme from '@/theme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC } from 'react';
import { Image, ImageSourcePropType, ScrollView, View } from 'react-native';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
  templateKey: string;
  onClose: () => void;
  onSubmit: () => void;
}

const StartTemplateBottomSheet: FC<Props> = ({
  sheetRef,
  templateKey,
  onClose,
  onSubmit,
}) => {
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[430]}
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
          title="Start with Template"
          onClose={onClose}
        />

        <BottomSheetView style={{ flexDirection: 'column', gap: 16 }}>
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <Image
              source={
                imagePath[
                  templateKey as keyof typeof imagePath
                ] as ImageSourcePropType
              }
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

          <Button onPress={onSubmit}>Start With This Template</Button>
        </BottomSheetView>
      </ScrollView>
    </BottomSheet>
  );
};

export default StartTemplateBottomSheet;
