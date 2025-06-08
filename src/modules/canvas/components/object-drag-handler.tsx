import React, { FC } from 'react';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { textConfig } from '@/constants/canvas-config';
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/hook/commonTypes';
import { useCanvasProvider } from '../provider/canvas-provider';

interface Props {
  objectDragGesture: PanGesture;
  selectedX: SharedValue<number>;
  selectedY: SharedValue<number>;
}

const ObjectDragHandler: FC<Props> = ({
  objectDragGesture,
  selectedX,
  selectedY,
}) => {
  const { getCanvasObjects, selected } = useCanvasProvider();

  const [texts, images] = getCanvasObjects('all');

  const objectControlStyle = useAnimatedStyle(() => {
    const baseStyle: DefaultStyle = {
      position: 'absolute',
      left: selectedX.value,
      top: selectedY.value,
      width: selected.spec?.width,
      height: selected.spec?.height,
    };

    if (selected.type === 'text') {
      return {
        ...baseStyle,
        width: (selected.spec?.width || 0) + textConfig.widthPadding,
        height: selected.spec?.height || 0,
        transform: [
          { translateX: textConfig.translateX },
          { translateY: textConfig.translateY },
        ],
      };
    }

    return baseStyle;
  }, [selected.id]);

  return [...texts, ...images]
    .filter(obj => obj.id === selected.id)
    .map(item => (
      <GestureDetector key={item.id} gesture={objectDragGesture}>
        <Animated.View style={objectControlStyle} />
      </GestureDetector>
    ));
};

export default ObjectDragHandler;
