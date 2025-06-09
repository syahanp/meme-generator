import { Image, Rect, useImage } from '@shopify/react-native-skia';
import React, { FC, useEffect, useState } from 'react';
import {
  runOnJS,
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
  const [selected, setSelected] = useState(false);
  const img = useImage(url);

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

  return (
    <>
      {selected && (
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
