import React, { useCallback } from 'react';
import { Edit3 } from 'react-native-feather';
import theme from '@/theme';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import ToolbarItem from '../toolbar-item';

const ToolbarEditStyle = () => {
  const { editSheet, selected } = useCanvasProvider();

  const openSheet = useCallback(() => {
    editSheet.current?.expand();
  }, [editSheet]);

  return (
    <ToolbarItem
      isActive={selected.id !== ''}
      Icon={Edit3}
      label="Style"
      onPress={openSheet}
      color={theme.colors.yellow[600]}
    />
  );
};

export default ToolbarEditStyle;
