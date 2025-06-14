import theme from '@/theme';
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { TextObject } from '../provider/canvas-provider.type';
import { useCanvasProvider } from '../provider/canvas-provider';

const TextEditHandler = () => {
  const { selected, editingTextById, updateObject } = useCanvasProvider();
  const selectedText =
    selected.type === 'text' ? (selected.spec as TextObject) : undefined;

  const [localValue, setLocalValue] = useState(selectedText?.value);

  // update value directly to provider
  const handleUpdateText = useCallback(
    (text: string) => {
      return updateObject({
        id: selected.id,
        type: 'text',
        payload: { value: text },
      });
    },
    [selected.id, updateObject],
  );

  useEffect(() => {
    setLocalValue(selectedText?.value);
  }, [selectedText?.id, selectedText?.value]); // reset on new selection

  const handleChangeText = (text: string) => {
    setLocalValue(text); // update input immediately
    handleUpdateText(text); // push to provider
  };

  // update height directly to provider
  const handleUpdateHeight = useCallback(
    (height: number) => {
      return updateObject({
        id: selected.id,
        type: 'text',
        payload: { height },
      });
    },
    [selected.id, updateObject],
  );

  if (!editingTextById || !selectedText) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [
          { translateX: selectedText.x - 8 },
          { translateY: selectedText.y - 8 },
        ],
      }}
    >
      <TextInput
        value={localValue}
        onChangeText={handleChangeText}
        autoFocus
        multiline
        textAlignVertical="top"
        onContentSizeChange={e => {
          handleUpdateHeight(e.nativeEvent.contentSize.height);
        }} // make input height grows dynamically
        style={{
          paddingHorizontal: 0,
          paddingVertical: 6,
          borderWidth: 1,
          letterSpacing: 0.5,
          lineHeight: 26,
          borderColor: theme.colors.blue[400],
          height: 'auto',
          width: selectedText.width + 12,
          color: selectedText.color,
          fontSize: selectedText.fontSize,
          fontWeight: selectedText.fontWeight === 'regular' ? 400 : 800,
          textAlign: 'center',
          fontFamily: (() => {
            if (selectedText.fontFamily === 'Poppins') {
              return theme.fontFamily.poppins[selectedText.fontWeight];
            }

            if (selectedText.fontFamily === 'Inter') {
              return theme.fontFamily.inter[selectedText.fontWeight];
            }

            if (selectedText.fontFamily === 'Playfair') {
              return theme.fontFamily.playfair[selectedText.fontWeight];
            }

            return '';
          })(),
        }}
      />
    </View>
  );
};

export default TextEditHandler;
