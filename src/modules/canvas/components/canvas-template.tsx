import theme from '@/theme';
import { Image, Rect, useImage } from '@shopify/react-native-skia';
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { imagePath } from '@/constants/images';

const { width, height } = Dimensions.get('window');

/**
 * Template initial specification
 */
const paddingX = 25;
const templateWidth = width - paddingX * 2;
const templateHeight = templateWidth;
const paddingY = height / 2.5 - templateHeight / 2;

interface Props {
  template?: string;
}

const CanvasTemplate: FC<Props> = ({ template }) => {
  const imgPath = imagePath[template as keyof typeof imagePath];
  const templateImage = useImage(imgPath);

  if (template) {
    return (
      <Image
        image={templateImage}
        fit="contain"
        x={paddingX}
        y={paddingY}
        width={templateWidth}
        height={templateHeight}
      />
    );
  }

  return (
    <Rect
      x={paddingX} // center X
      y={paddingY} // center Y
      width={templateWidth}
      height={templateHeight}
      color={theme.colors.white}
      strokeCap="round"
      strokeWidth={1}
    />
  );
};

export default CanvasTemplate;
