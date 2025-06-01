import React, { FC, useMemo } from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import BottomSheetTitle from '@/components/bottom-sheet-title';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import BottomSheetCustomBackdrop from '@/components/bottom-sheet-custom-backdrop';
import EditTextStyle from './edit-text-style';
import EditImageStyle from './edit-image-style';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const EditBottomSheet: FC<Props> = ({ sheetRef }) => {
  const { selected } = useCanvasProvider();

  const title = useMemo(() => {
    return selected.type === 'text' ? 'Edit Text' : 'Edit Image';
  }, [selected]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[380]}
      index={-1}
      backdropComponent={props => (
        <BottomSheetCustomBackdrop {...props} backgroundColor="transparent" />
      )}
    >
      <BottomSheetView style={{ paddingHorizontal: 20 }}>
        <BottomSheetTitle sheetRef={sheetRef} title={title} />
      </BottomSheetView>

      <BottomSheetScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          gap: 16,
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
      >
        {selected.type === 'text' ? <EditTextStyle /> : <EditImageStyle />}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default EditBottomSheet;
