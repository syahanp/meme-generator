import theme from '@/theme';
import { Image, Rect, useImage } from '@shopify/react-native-skia';
import React, { FC } from 'react';
import { imagePath } from '@/constants/images';
import { canvasSpec } from '@/constants/canvas-config';

interface Props {
  template?: string;
}

const CanvasTemplate: FC<Props> = ({ template }) => {
  const imgPath = imagePath[template as keyof typeof imagePath];
  const templateImage = useImage(imgPath);

  const { canvasX, canvasY, canvasWidth, canvasHeight } = canvasSpec;

  if (template) {
    return (
      <Image
        image={templateImage}
        fit="contain"
        x={canvasX}
        y={canvasY}
        width={canvasWidth}
        height={canvasHeight}
      />
    );
  }

  return (
    <Rect
      x={canvasX} // center X
      y={canvasY} // center Y
      width={canvasWidth}
      height={canvasHeight}
      color={theme.colors.white}
      strokeCap="round"
      strokeWidth={1}
    />
  );
};

export default CanvasTemplate;
