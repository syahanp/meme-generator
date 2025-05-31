import React from 'react';
import { Dimensions } from 'react-native';
import { Canvas } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useCanvasProvider } from '../../provider/canvas-provider';
import TextItem from './objects/text-item';
import useCanvasGesture from './hooks/use-canvas-gesture';

const { width, height } = Dimensions.get('window');

const CanvasContainer = () => {
  const { textObjects, selectedObject } = useCanvasProvider();

  const {
    canvasViewGesture,
    objectDragGesture,
    scale,
    translationX,
    translationY,
    selectedX,
    selectedY,
    objectControlStyle,
  } = useCanvasGesture();

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={canvasViewGesture}>
      <Animated.View style={[{ width, height }, transformStyle]}>
        <Canvas style={{ width, height }}>
          {textObjects.map(textObj => {
            const isSelected = selectedObject.id === textObj.id;
            return (
              <TextItem
                key={`${textObj.id}-${textObj.x}-${textObj.y}`}
                isSelected={isSelected}
                {...textObj}
                sharedX={isSelected ? selectedX : undefined}
                sharedY={isSelected ? selectedY : undefined}
              />
            );
          })}
        </Canvas>

        {textObjects
          .filter(obj => obj.id === selectedObject.id)
          .map(item => (
            <GestureDetector key={item.id} gesture={objectDragGesture}>
              <Animated.View style={objectControlStyle} />
            </GestureDetector>
          ))}
      </Animated.View>
    </GestureDetector>
  );
};

export default CanvasContainer;
