import React from 'react';
import { Dimensions } from 'react-native';
import { Canvas } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useCanvasProvider } from '../../provider/canvas-provider';
import TextItem from '../canvas-objects/text-item';
import useCanvasGesture from './use-canvas-gesture';
import CanvasTemplate from '../canvas-template';
import TextEditHandler from '../text-edit-handler';
import ObjectDragHandler from '../object-drag-handler';
import ImageItem from '../canvas-objects/image-item';
import { TextObject } from '../../provider/canvas-provider.type';

const { width, height } = Dimensions.get('window');

const CanvasView = () => {
  const { getCanvasObjects, editingTextById, route, selected } =
    useCanvasProvider();

  const {
    canvasViewGesture,
    objectDragGesture,
    scale,
    translationX,
    translationY,
    selectedX,
    selectedY,
  } = useCanvasGesture();

  const [texts, images] = getCanvasObjects('all');

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
          <CanvasTemplate template={route.params?.template} />

          {texts.map(textObj => {
            const isSelected = selected.id === textObj.id;
            const isEditing = (() => {
              if (!editingTextById || !selected.id) return false;
              return editingTextById === textObj.id;
            })();

            return (
              <TextItem
                key={`${textObj.id}-${textObj.x}-${textObj.y}`}
                {...textObj}
                isSelected={isSelected}
                isEditing={isEditing}
                sharedX={isSelected ? selectedX : undefined}
                sharedY={isSelected ? selectedY : undefined}
              />
            );
          })}

          {images.map(imgObj => {
            const isSelected = selected.id === imgObj.id;

            return (
              <ImageItem
                key={`${imgObj.id}-${imgObj.x}-${imgObj.y}`}
                {...imgObj}
                isSelected={isSelected}
                sharedX={isSelected ? selectedX : undefined}
                sharedY={isSelected ? selectedY : undefined}
              />
            );
          })}
        </Canvas>

        {/* Text edit handler */}
        <TextEditHandler
          selectedText={
            selected.type === 'text' ? (selected.spec as TextObject) : undefined
          }
        />

        {/* Object drag handler */}
        <ObjectDragHandler objectDragGesture={objectDragGesture} />
      </Animated.View>
    </GestureDetector>
  );
};

export default CanvasView;
