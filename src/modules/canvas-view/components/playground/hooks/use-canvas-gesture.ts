import { useCanvasProvider } from '@/modules/canvas-view/provider/canvas-provider';
import { TextObject } from '@/modules/canvas-view/provider/canvas-provider.type';
import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  clamp,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const useCanvasGesture = () => {
  const { selectedObject, selectObject, textObjects, updateObject } =
    useCanvasProvider();

  const selected = useMemo(
    () => textObjects.find(obj => obj.id === selectedObject.id),
    [selectedObject.id, textObjects],
  ) as TextObject;

  // Canvas Proprty
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  // Object Property
  const selectedX = useSharedValue(0);
  const selectedY = useSharedValue(0);

  // for zoom in/out
  const pinchGesture = Gesture.Pinch().onUpdate(e => {
    scale.value = e.scale;
  });

  // for panning
  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      if (selectedObject.id) return; // prevent panning if object is selected

      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      if (selectedObject.id) return; // prevent panning if object is selected

      const maxTranslateX = width / 4;
      const maxTranslateY = height / 4;

      // clamp the translation values to prevent canvas going out of bounds
      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .runOnJS(true);

  const singleTapToSelect = Gesture.Tap()
    .onEnd(event => {
      const hit = textObjects.find(obj => {
        const { x } = obj;
        const { y } = obj;

        // roughly, relative to tap location
        return (
          event.x >= x &&
          event.x <= x + 100 &&
          event.y >= y - 20 &&
          event.y <= y + 20
        );
      });

      if (hit) {
        selectedX.value = hit.x;
        selectedY.value = hit.y;
        selectObject(hit.id, hit.type);
      } else {
        selectObject('', 'empty');
      }
    })
    .runOnJS(true);

  // edit text value
  const doubleTapToEditText = Gesture.Tap()
    .maxDuration(200)
    .numberOfTaps(2)
    .onEnd(() => {
      console.log('double tap');
    })
    .runOnJS(true);

  /**
   * Object dragging after selection
   */
  const objectDragGesture = Gesture.Pan()
    .minDistance(1)

    // we need to init the current position first
    .onStart(() => {
      if (!selectedObject.id || !selected) return;

      selectedX.value = selected.x;
      selectedY.value = selected.y;
    })
    .onUpdate(e => {
      if (!selectedObject.id) return;

      const maxTranslateX = width;
      const maxTranslateY = height;

      // clamp the translation values to prevent canvas going out of bounds
      selectedX.value = clamp(selected.x + e.translationX, 0, maxTranslateX);
      selectedY.value = clamp(selected.y + e.translationY, 0, maxTranslateY);
    })
    .onEnd(() => {
      if (!selectedObject.id) return;

      if (selectedObject.type === 'text') {
        updateObject({
          id: selectedObject.id,
          type: 'text',
          payload: {
            x: selectedX.value,
            y: selectedY.value,
          },
        });
      }
    })
    .runOnJS(true);

  const objectControlStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: selectedX.value - 8,
      top: selectedY.value - 8,
      width: selected?.width,
      height: 50,
      backgroundColor: 'red',
      opacity: 0.2,
    }),
    [selectedX, selectedY, selected],
  );

  const canvasViewGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    singleTapToSelect,
    doubleTapToEditText,
  );

  return {
    canvasViewGesture,
    objectDragGesture,
    scale,
    translationX,
    translationY,
    selectedX,
    selectedY,
    objectControlStyle,
  };
};

export default useCanvasGesture;
