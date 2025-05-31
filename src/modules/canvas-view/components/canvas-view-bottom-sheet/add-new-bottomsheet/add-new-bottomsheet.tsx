import React, { FC } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image, Type } from 'react-native-feather';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import BottomSheetTitle from '@/components/bottom-sheet-title';
import AddNewItem from './add-new-item';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const AddNewBottomSheet: FC<Props> = ({ sheetRef }) => {
  const { addNewSheet, addNewText } = useCanvasProvider();

  const handleAddNewText = () => {
    addNewText();

    addNewSheet.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[180]}
      index={-1}
      enablePanDownToClose
    >
      <BottomSheetView
        style={{ height: '100%', paddingHorizontal: 20, paddingBottom: 20 }}
      >
        <BottomSheetTitle sheetRef={sheetRef} title="Add New Object" />

        <BottomSheetView>
          <AddNewItem Icon={Type} label="Text" onPress={handleAddNewText} />
          <AddNewItem Icon={Image} label="Image" />
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default AddNewBottomSheet;
