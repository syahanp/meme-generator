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
import React, { FC, useEffect, useMemo } from 'react';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { textConfig } from '@/constants/canvas-config';
import { TextObject } from '../../provider/canvas-provider.type';

type TextObjectProps = TextObject & {
  isEditing: boolean;
  sharedSelectedId: SharedValue<string>;
  sharedX: SharedValue<number>;
  sharedY: SharedValue<number>;
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
  sharedX,
  sharedY,
  isEditing,
  sharedSelectedId,
}) => {
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
      { textAlign: TextAlign.Left },
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

  const isSelected = useDerivedValue(() => {
    return sharedSelectedId.value === id;
  }).value;

  const positionX = useDerivedValue(() => {
    return sharedSelectedId.value === id ? sharedX.value : translationX.value;
  });
  const positionY = useDerivedValue(() => {
    return sharedSelectedId.value === id ? sharedY.value : translationY.value;
  });

  if (!paragraph || isEditing) return null;

  // calculate width and height for selection Rect box
  paragraph.layout(width);
  const paragraphWidth = width;
  const paragraphHeight = paragraph.getHeight();

  return (
    <>
      {isSelected && (
        <Rect
          x={positionX}
          y={positionY}
          width={paragraphWidth + textConfig.widthPadding}
          height={paragraphHeight + textConfig.heightPadding}
          color={theme.colors.blue[400]}
          style="stroke"
          strokeWidth={2}
          transform={[
            { translateX: textConfig.translateX },
            { translateY: textConfig.translateY },
          ]}
        />
      )}

      <Paragraph
        key={id}
        paragraph={paragraph}
        x={positionX}
        y={positionY}
        width={width}
      />
    </>
  );
};

export default TextItem;
