import React, { useEffect, useState } from 'react';
import theme from '@/theme';
import { Pressable, View } from 'react-native';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import EditSection from './edit-section';

const colors = Object.keys(theme.colors) as (keyof typeof theme.colors)[];

const EditColor = () => {
  const { selectedTextObject, updateObject } = useCanvasProvider();
  const [value, setValue] = useState<keyof typeof theme.colors>('black');

  // initializer
  useEffect(() => {
    setValue(selectedTextObject?.color);
  }, [selectedTextObject?.color]);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedTextObject?.id,
      type: 'text',
      payload: { color: value },
    });
  }, [selectedTextObject?.id, updateObject, value]);

  return (
    <EditSection title="Colors">
      <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
        {colors.map(color => {
          const isActive = value === color;

          return (
            <Pressable
              key={color}
              style={{
                width: 37,
                height: 37,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: isActive
                  ? theme.colors.grey[800]
                  : theme.colors.grey[300],
                backgroundColor: (() => {
                  if (color === 'white' || color === 'black') {
                    return theme.colors[color];
                  }

                  return theme.colors[color][500];
                })(),
              }}
              onPress={() => setValue(color)}
            />
          );
        })}
      </View>
    </EditSection>
  );
};

export default EditColor;
