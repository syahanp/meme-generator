import React, { useCallback } from 'react';
import { Plus } from 'react-native-feather';
import ToolbarItem from '../toolbar-item';
import { useCanvasProvider } from '../../../provider/canvas-provider';

const ToolbarAdd = () => {
  const { addNewSheet } = useCanvasProvider();

  const openSheet = useCallback(() => {
    addNewSheet.current?.expand();
  }, [addNewSheet]);

  return <ToolbarItem isActive Icon={Plus} label="Add" onPress={openSheet} />;
};

export default ToolbarAdd;
