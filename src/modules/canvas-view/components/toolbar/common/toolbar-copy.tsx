import React from 'react';
import { Copy } from 'react-native-feather';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import { generateUUID } from '@/helper/common';
import ToolbarItem from '../toolbar-item';

const ToolbarCopy = () => {
  const { textObjects, addTextObject, selectedObject, selectObject } =
    useCanvasProvider();

  const handleCopy = () => {
    if (selectedObject.type === 'text') {
      // find related text object properties
      const selectedTextObject = textObjects.find(
        obj => obj.id === selectedObject.id,
      );

      if (selectedTextObject) {
        // create a new text object with the same properties
        const newID = generateUUID();
        addTextObject({
          ...selectedTextObject,
          id: newID,
          x: selectedTextObject.x + 40,
          y: selectedTextObject.y + 40,
        });

        // auto select that new object
        selectObject(newID, 'text');
      }
    }
  };

  return (
    <ToolbarItem
      isActive={selectedObject.id !== ''}
      Icon={Copy}
      label="Copy"
      onPress={handleCopy}
    />
  );
};

export default ToolbarCopy;
