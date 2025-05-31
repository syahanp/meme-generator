import React from 'react';
import { Trash } from 'react-native-feather';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import theme from '@/theme';
import ToolbarItem from '../toolbar-item';

const ToolbarDelete = () => {
  const { deleteObject, selectedObject, selectObject } = useCanvasProvider();

  const handleDelete = () => {
    deleteObject(selectedObject.type, selectedObject.id);
    selectObject('', 'empty');
  };

  return (
    <ToolbarItem
      isActive={selectedObject.id !== ''}
      Icon={Trash}
      label="Delete"
      color={theme.colors.red[600]}
      onPress={handleDelete}
    />
  );
};

export default ToolbarDelete;
