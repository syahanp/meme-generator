import { Image, Rect, useImage } from '@shopify/react-native-skia';
import React, { FC, useEffect } from 'react';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import theme from '@/theme';
import { ImageObject } from '../../provider/canvas-provider.type';

type Props = ImageObject & {
  sharedSelectedId: SharedValue<string>;
  sharedX: SharedValue<number>;
  sharedY: SharedValue<number>;
};

const ImageItem: FC<Props> = ({
  id,
  x,
  y,
  width,
  height,
  url,
  sharedX,
  sharedY,
  opacity,
  sharedSelectedId,
}) => {
  const img = useImage(url);

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
