import React, { FC, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import BottomSheetTitle from '@/components/bottom-sheet-title';
import { ScrollView } from 'react-native-gesture-handler';
import EditFontFamily from './edit-font-family';
import EditColor from './edit-color';
import EditFontWeight from './edit-font-weight';
import EditFontSize from './edit-font-size';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const EditBottomSheet: FC<Props> = ({ sheetRef }) => {
  const { selectedObject } = useCanvasProvider();

  const title = useMemo(() => {
    return selectedObject.type === 'text' ? 'Edit Text' : 'Edit Image';
  }, [selectedObject]);

  return (
    <BottomSheet ref={sheetRef} snapPoints={[420]} index={-1}>
      <ScrollView
        style={{ height: '100%', paddingHorizontal: 20, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <BottomSheetTitle sheetRef={sheetRef} title={title} />

        <BottomSheetView style={{ flexDirection: 'column', gap: 16 }}>
          <EditFontFamily />
          <EditFontWeight />
          <EditColor />
          <EditFontSize />
        </BottomSheetView>
      </ScrollView>
    </BottomSheet>
  );
};

export default EditBottomSheet;
