import React from 'react';
import { Trash } from 'react-native-feather';
import theme from '@/theme';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import ToolbarItem from '../toolbar-item';

const ToolbarDelete = () => {
  const { deleteObject, selected, selectObject } = useCanvasProvider();

  const handleDelete = () => {
    deleteObject(selected.type, selected.id);
    selectObject('', 'text');
  };

  return (
    <ToolbarItem
      isActive={selected.id !== ''}
      Icon={Trash}
      label="Delete"
      color={theme.colors.red[600]}
      onPress={handleDelete}
    />
  );
};

export default ToolbarDelete;
