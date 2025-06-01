import React, { FC, useEffect, useState } from 'react';
import theme from '@/theme';
import { Text } from 'react-native-gesture-handler';
import { Pressable, View } from 'react-native';
import {
  FontWeightType,
  TextObject,
} from '@/modules/canvas/provider/canvas-provider.type';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import EditSection from './edit-section';

const fontWeights: { name: string; code: FontWeightType }[] = [
  {
    name: 'Regular',
    code: 'regular',
  },
  {
    name: 'Bold',
    code: 'bold',
  },
];

interface Props {
  selectedText: TextObject;
}

const EditFontWeight: FC<Props> = ({ selectedText }) => {
  const { updateObject } = useCanvasProvider();
  const [value, setValue] = useState<FontWeightType>(selectedText?.fontWeight);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedText?.id,
      type: 'text',
      payload: { fontWeight: value },
    });
  }, [selectedText?.id, updateObject, value]);

  return (
    <EditSection title="Font Weight">
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {fontWeights.map(font => {
          const isActive = value === font.code;

          return (
            <Pressable
              key={font.code}
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
