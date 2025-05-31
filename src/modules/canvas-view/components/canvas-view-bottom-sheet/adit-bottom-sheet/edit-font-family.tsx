import React, { useEffect, useState } from 'react';
import theme from '@/theme';
import { Text } from 'react-native-gesture-handler';
import { Pressable, View } from 'react-native';
import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import { FontFamilyType } from '@/modules/canvas-view/provider/canvas-provider.type';
import EditSection from './edit-section';

const fontFamilies: { name: FontFamilyType; code: string }[] = [
  {
    name: 'Poppins',
    code: theme.fontFamily.poppins.regular,
  },
  {
    name: 'Inter',
    code: theme.fontFamily.inter.regular,
  },
  {
    name: 'Playfair',
    code: theme.fontFamily.playfair.regular,
  },
];

const EditFontFamily = () => {
  const { selectedTextObject, updateObject } = useCanvasProvider();
  const [value, setValue] = useState<FontFamilyType>('Poppins');

  // initializer
  useEffect(() => {
    setValue(selectedTextObject?.fontFamily);
  }, [selectedTextObject?.fontFamily]);

  // updater
  useEffect(() => {
    updateObject({
      id: selectedTextObject?.id,
      type: 'text',
      payload: { fontFamily: value },
    });
  }, [selectedTextObject?.id, updateObject, value]);

  return (
    <EditSection title="Font Family">
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {fontFamilies.map(font => {
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
              onPress={() => setValue(font.name)}
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

export default EditFontFamily;
