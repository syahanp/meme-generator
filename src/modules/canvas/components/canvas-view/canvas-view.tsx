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
import SnapIndicators from '../canvas-objects/snap-indicators';

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
    horizontalSnapOpacity,
    verticalSnapOpacity,
    sharedSelectedId,
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
            const isEditing = (() => {
              if (!editingTextById || !selected.id) return false;
              return editingTextById === textObj.id;
            })();

            return (
              <TextItem
                key={textObj.id}
                {...textObj}
                isEditing={isEditing}
                sharedX={selectedX}
                sharedY={selectedY}
                sharedSelectedId={sharedSelectedId}
              />
            );
          })}

          {images.map(imgObj => (
            <ImageItem
              key={imgObj.id}
              {...imgObj}
              sharedX={selectedX}
              sharedY={selectedY}
              sharedSelectedId={sharedSelectedId}
            />
          ))}

          <SnapIndicators
            horizontalSnapOpacity={horizontalSnapOpacity}
            verticalSnapOpacity={verticalSnapOpacity}
          />
        </Canvas>

        {/* Text edit handler */}
        <TextEditHandler />

        {/* Object drag handler */}
        <ObjectDragHandler
          objectDragGesture={objectDragGesture}
          selectedX={selectedX}
          selectedY={selectedY}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default CanvasView;
