import React, { FC } from 'react';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useCanvasProvider } from '../provider/canvas-provider';

interface Props {
  objectDragGesture: PanGesture;
}

const ObjectDragHandler: FC<Props> = ({ objectDragGesture }) => {
  const { getCanvasObjects, selected } = useCanvasProvider();

  const [texts, images] = getCanvasObjects('all');

  const objectControlStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: selected.spec?.x || 0,
      top: selected.spec?.y || 0,
      width: selected.spec?.width,
      height: selected.spec?.height,
    }),
    [selected.id],
  );

  return [...texts, ...images]
    .filter(obj => obj.id === selected.id)
    .map(item => (
      <GestureDetector key={item.id} gesture={objectDragGesture}>
        <Animated.View style={objectControlStyle} />
      </GestureDetector>
    ));
};

export default ObjectDragHandler;
