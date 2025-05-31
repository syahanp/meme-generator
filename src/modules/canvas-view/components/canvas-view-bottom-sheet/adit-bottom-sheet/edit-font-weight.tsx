import React, { useEffect, useState } from 'react';
import theme from '@/theme';
import { Text } from 'react-native-gesture-handler';
import { Pressable, View } from 'react-native';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import { FontWeightType } from '@/modules/canvas-view/provider/canvas-provider.type';
import EditSection from './edit-section';

const fontWeights: { name: string; code: FontWeightType }[] = [
  {
    name: 'Regular',
    code: '400',
  },
  {
    name: 'Bold',
    code: '700',
  },
];

const EditFontWeight = () => {
  const { selectedTextObject, updateObject } = useCanvasProvider();
  const [value, setValue] = useState<FontWeightType>('400');

  useEffect(() => {
    setValue(selectedTextObject?.fontWeight);
  }, [selectedTextObject?.fontWeight]);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedTextObject?.id,
      type: 'text',
      payload: { fontWeight: value },
    });
  }, [selectedTextObject?.id, updateObject, value]);

  return (
    <EditSection title="Font Weight">
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {fontWeights.map(font => {
          const isActive = value === font.code;

          return (
            <Pressable
              key={font.name}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                outlineWidth: isActive ? 2 : 1,
                outlineColor: isActive
                  ? theme.colors.grey[800]
                  : theme.colors.grey[300],
                backgroundColor: theme.colors.grey[50],
                borderRadius: 3,
              }}
              onPress={() => setValue(font.code)}
            >
              <Text style={{ fontSize: 14, fontFamily: font.code }}>
                {font.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </EditSection>
  );
};

export default EditFontWeight;
