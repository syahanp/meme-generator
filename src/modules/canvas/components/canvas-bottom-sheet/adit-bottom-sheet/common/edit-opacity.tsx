import React, { FC, useEffect, useState } from 'react';
import theme from '@/theme';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { ImageObject } from '@/modules/canvas/provider/canvas-provider.type';
import { Slider } from '@rneui/themed';
import EditSection from './edit-section';

interface Props {
  selectedImage: ImageObject;
}

const EditOpacity: FC<Props> = ({ selectedImage }) => {
  const { updateObject } = useCanvasProvider();
  const [value, setValue] = useState(selectedImage?.opacity);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedImage?.id,
      type: 'image',
      payload: { opacity: value },
    });
  }, [selectedImage?.id, updateObject, value]);

  return (
    <EditSection title={`Opacity: ${value}`}>
      <Slider
        value={value * 10} // this slide not support 0-1 range
        onValueChange={val => setValue(val / 10)} // value is in 0-10 range
        minimumValue={0}
        maximumValue={10}
        step={1}
        allowTouchTrack
        thumbStyle={{
          width: 22,
          height: 22,
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

export default EditOpacity;
