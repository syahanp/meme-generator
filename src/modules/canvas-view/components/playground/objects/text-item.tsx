import { TextObject } from '@/modules/canvas-view/provider/canvas-provider.type';
import theme from '@/theme';
import {
  FontWeight as SkiaFontWeight,
  Paragraph,
  Rect,
  Skia,
  TextAlign,
  useFonts,
} from '@shopify/react-native-skia';
import React, { FC, useMemo } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

type TextObjectProps = TextObject & {
  isSelected: boolean;
  sharedX?: SharedValue<number>;
  sharedY?: SharedValue<number>;
};

const TextItem: FC<TextObjectProps> = ({
  value,
  x,
  y,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  isSelected,
  width,
  sharedX,
  sharedY,
}) => {
  const customFontMgr = useFonts({
    Poppins: [theme.fontPath.poppins.regular],
    Inter: [theme.fontPath.inter.regular],
    Playfair: [theme.fontPath.playfair.regular],
  });

  const resolvedColor = useMemo(() => {
    if (color === 'white' || color === 'black') {
      return theme.colors[color];
    }

    return theme.colors[color][500];
  }, [color]);

  const paragraph = useMemo(() => {
    if (!customFontMgr) return null;

    const textStyle = {
      color: Skia.Color(resolvedColor),
      fontFamilies: ['Poppins', 'Inter', 'Playfair'],
      fontFamily,
      fontSize,
      fontWeight:
        fontWeight === '400' ? SkiaFontWeight.Normal : SkiaFontWeight.Bold,
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

  // if shared value is provided, use it
  const positionX = useMemo(
    () => sharedX || translationX,
    [sharedX, translationX],
  );
  const positionY = useMemo(
    () => sharedY || translationY,
    [sharedY, translationY],
  );

  if (!paragraph) return null;

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
          width={paragraphWidth + 16}
          height={paragraphHeight + 8}
          color={theme.colors.blue[400]}
          style="stroke"
          strokeWidth={2}
          transform={[{ translateX: -8 }, { translateY: -4 }]}
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
