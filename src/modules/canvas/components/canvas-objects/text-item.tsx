import theme from '@/theme';
import {
  Paragraph,
  Rect,
  Skia,
  TextAlign,
  useFonts,
  FontStyle,
  SkTextStyle,
} from '@shopify/react-native-skia';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  runOnJS,
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  CanvasProviderType,
  TextObject,
} from '../../provider/canvas-provider.type';

type TextObjectProps = TextObject & {
  isEditing: boolean;
  sharedSelectedId: SharedValue<string>;
  sharedX: SharedValue<number>;
  sharedY: SharedValue<number>;
  updateObject: CanvasProviderType['updateObject'];
};

const TextItem: FC<TextObjectProps> = ({
  id,
  value,
  x,
  y,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  width,
  height,
  sharedX,
  sharedY,
  isEditing,
  sharedSelectedId,
  updateObject,
}) => {
  const [selected, setSelected] = useState(false);

  const customFontMgr = useFonts({
    Poppins: [theme.fontPath.poppins.regular, theme.fontPath.poppins.bold],
    Inter: [theme.fontPath.inter.regular, theme.fontPath.inter.bold],
    Playfair: [theme.fontPath.playfair.regular, theme.fontPath.playfair.bold],
  });

  const resolvedColor = useMemo(() => {
    if (color === 'white' || color === 'black') {
      return theme.colors[color];
    }

    return theme.colors[color][500];
  }, [color]);

  const paragraph = useMemo(() => {
    if (!customFontMgr) return null;

    const textStyle: SkTextStyle = {
      color: Skia.Color(resolvedColor),
      fontFamilies: [fontFamily],
      fontSize,
      fontStyle: fontWeight === 'regular' ? FontStyle.Normal : FontStyle.Bold,
    };

    return Skia.ParagraphBuilder.Make(
      { textAlign: TextAlign.Center },
      customFontMgr,
    )
      .pushStyle(textStyle)
      .addText(value)
      .pop()
      .build();
  }, [customFontMgr, fontFamily, fontSize, fontWeight, resolvedColor, value]);

  // default value
  const translationX = useSharedValue(x);
  const translationY = useSharedValue(y);

  useEffect(() => {
    translationX.value = x;
    translationY.value = y;
  }, [x, y, translationX, translationY]);

  /**
   * we capture changes in UI thread to compare id. Because it's in the
   * UI thread (worklet), we must runOnJS to access/pass to JS thread
   */
  useDerivedValue(() => {
    if (sharedSelectedId.value === id) {
      runOnJS(setSelected)(true);
    } else {
      runOnJS(setSelected)(false);
    }
  });

  const positionX = useDerivedValue(() => {
    return sharedSelectedId.value === id ? sharedX.value : translationX.value;
  });
  const positionY = useDerivedValue(() => {
    return sharedSelectedId.value === id ? sharedY.value : translationY.value;
  });

  /**
   * Height of text is calculated/adjusted internally by Skia,
   * so we need to update the height of text whenever the Skia paragraph style changes.
   */
  useEffect(() => {
    if (paragraph) {
      paragraph.layout(width);
      const newHeight = paragraph.getHeight();

      // if height in provider is different from Skia height
      if (height !== newHeight) {
        updateObject({
          id,
          type: 'text',
          payload: { height: newHeight },
        });
      }
    }
  }, [height, id, paragraph, updateObject, width]);

  if (!paragraph || isEditing) return null;

  // calculate internal Skia Paragraph width and height
  paragraph.layout(width);
  const paragraphWidth = width;
  const paragraphHeight = paragraph.getHeight();

  return (
    <>
      {selected && (
        <Rect
          x={positionX}
          y={positionY}
          width={paragraphWidth}
          height={paragraphHeight}
          color={theme.colors.blue[400]}
          style="stroke"
          strokeWidth={2}
        />
      )}

      <Paragraph
        paragraph={paragraph}
        x={positionX}
        y={positionY}
        width={width}
      />
    </>
  );
};

export default TextItem;
