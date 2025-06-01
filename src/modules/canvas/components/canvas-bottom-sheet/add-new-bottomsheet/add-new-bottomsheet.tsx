import React, { FC } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image, Type } from 'react-native-feather';
import BottomSheetTitle from '@/components/bottom-sheet-title';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { launchImageLibrary } from 'react-native-image-picker';
import BottomSheetCustomBackdrop from '@/components/bottom-sheet-custom-backdrop';
import AddNewItem from './add-new-item';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const AddNewBottomSheet: FC<Props> = ({ sheetRef }) => {
  const { addNewSheet, addNewText, addNewImage } = useCanvasProvider();

  const handleAddText = () => {
    addNewText({}, { auto: 'edit-text' });

    addNewSheet.current?.close();
  };

  const handleAddImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
    });

    if (!result.didCancel) {
      const url = result.assets?.[0].uri;

      addNewImage({ url });
    }

    addNewSheet.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[180]}
      index={-1}
      enablePanDownToClose
      backdropComponent={props => (
        <BottomSheetCustomBackdrop {...props} backgroundColor="transparent" />
      )}
    >
      <BottomSheetView
        style={{ height: '100%', paddingHorizontal: 20, paddingBottom: 20 }}
      >
        <BottomSheetTitle sheetRef={sheetRef} title="Add New Object" />

        <BottomSheetView>
          <AddNewItem Icon={Type} label="Text" onPress={handleAddText} />
          <AddNewItem Icon={Image} label="Image" onPress={handleAddImage} />
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default AddNewBottomSheet;
