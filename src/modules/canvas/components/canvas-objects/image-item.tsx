import { Image, Rect, useImage } from '@shopify/react-native-skia';
import React, { FC, useMemo } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import theme from '@/theme';
import { ImageObject } from '../../provider/canvas-provider.type';

type Props = ImageObject & {
  isSelected: boolean;
  sharedX?: SharedValue<number>;
  sharedY?: SharedValue<number>;
};

const ImageItem: FC<Props> = ({
  x,
  y,
  width,
  height,
  isSelected,
  url,
  sharedX,
  sharedY,
  opacity,
}) => {
  const img = useImage(url);

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

  return (
    <>
      {isSelected && (
        <Rect
          x={positionX}
          y={positionY}
          width={width}
          height={height}
          color={theme.colors.blue[400]}
          style="stroke"
          strokeWidth={2}
        />
      )}
      <Image
        image={img}
        fit="contain"
        x={positionX}
        y={positionY}
        width={width}
        height={height}
        opacity={opacity}
      />
    </>
  );
};

export default ImageItem;
