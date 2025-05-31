import React, { useEffect, useState } from 'react';
import { Slider } from '@rneui/themed';
import theme from '@/theme';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import EditSection from './edit-section';

const EditFontSize = () => {
  const { selectedTextObject, updateObject } = useCanvasProvider();
  const [value, setValue] = useState(0);

  // initializer
  useEffect(() => {
    setValue(selectedTextObject?.fontSize);
  }, [selectedTextObject?.fontSize]);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedTextObject?.id,
      type: 'text',
      payload: { fontSize: value },
    });
  }, [selectedTextObject?.id, updateObject, value]);

  return (
    <EditSection title={`Font Size (${value})`}>
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
