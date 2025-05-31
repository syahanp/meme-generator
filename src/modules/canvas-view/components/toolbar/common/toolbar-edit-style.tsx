import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import React, { useCallback } from 'react';
import { Edit3 } from 'react-native-feather';
import theme from '@/theme';
import ToolbarItem from '../toolbar-item';

const ToolbarEditStyle = () => {
  const { editSheet, selectedObject } = useCanvasProvider();

  const openSheet = useCallback(() => {
    editSheet.current?.expand();
  }, [editSheet]);

  return (
    <ToolbarItem
      isActive={selectedObject.id !== ''}
      Icon={Edit3}
      label="Style"
      onPress={openSheet}
      color={theme.colors.yellow[600]}
    />
  );
};

export default ToolbarEditStyle;
