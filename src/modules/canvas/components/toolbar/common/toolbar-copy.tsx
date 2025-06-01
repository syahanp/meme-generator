import React from 'react';
import { Copy } from 'react-native-feather';
import { generateUUID } from '@/helper/common';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import ToolbarItem from '../toolbar-item';

const ToolbarCopy = () => {
  const { addNewText, addNewImage, selected } = useCanvasProvider();

  // create a new text object with the same properties
  const handleCopy = () => {
    const id = generateUUID();
    const randomize = Math.random() * 20;

    if (selected.type === 'text') {
      addNewText({
        ...selected.spec,
        id,
        x: (selected.spec?.x || 0) + 25 + randomize,
        y: (selected.spec?.y || 0) + 25 + randomize,
      });
    }

    if (selected.type === 'image') {
      addNewImage({
        ...selected.spec,
        id,
        x: (selected.spec?.x || 0) + 25 + randomize,
        y: (selected.spec?.y || 0) + 25 + randomize,
      });
    }
  };

  return (
    <ToolbarItem
      isActive={selected.id !== ''}
      Icon={Copy}
      label="Copy"
      onPress={handleCopy}
    />
  );
};

export default ToolbarCopy;
