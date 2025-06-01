import React, { FC, useEffect, useState } from 'react';
import { Slider } from '@rneui/themed';
import theme from '@/theme';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { TextObject } from '@/modules/canvas/provider/canvas-provider.type';
import EditSection from './edit-section';

interface Props {
  selectedText: TextObject;
}

const EditFontSize: FC<Props> = ({ selectedText }) => {
  const { updateObject } = useCanvasProvider();
  const [value, setValue] = useState(selectedText?.fontSize);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedText?.id,
      type: 'text',
      payload: { fontSize: value },
    });
  }, [selectedText?.id, updateObject, value]);

  return (
    <EditSection title={`Font Size: ${value}`}>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={40}
        minimumValue={8}
        step={1}
        allowTouchTrack
        thumbStyle={{
          width: 25,
          height: 25,
          borderRadius: 50,
          backgroundColor: theme.colors.grey[800],
        }}
        trackStyle={{
          height: 3,
          borderRadius: 50,
        }}
      />
    </EditSection>
  );
};

export default EditFontSize;
