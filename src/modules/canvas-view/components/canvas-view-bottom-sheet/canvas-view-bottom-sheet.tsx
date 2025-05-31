import React from 'react';
import AddNewBottomSheet from './add-new-bottomsheet';
import { useCanvasProvider } from '../../provider/canvas-provider';
import EditBottomSheet from './adit-bottom-sheet';

const CanvasViewBottomSheet = () => {
  const { addNewSheet, editSheet } = useCanvasProvider();

  return (
    <>
      <AddNewBottomSheet sheetRef={addNewSheet} />
      <EditBottomSheet sheetRef={editSheet} />
    </>
  );
};

export default CanvasViewBottomSheet;
