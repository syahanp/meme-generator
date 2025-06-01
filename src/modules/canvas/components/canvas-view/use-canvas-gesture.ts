import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, clamp } from 'react-native-reanimated';

const window = Dimensions.get('window');

const useCanvasGesture = () => {
  const {
    selected,
    selectObject,
    getCanvasObjects,
    updateObject,
    selectTextToEdit,
  } = useCanvasProvider();

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
      if (selected.id) return; // prevent panning if object is selected

      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      if (selected.id) return; // prevent panning if object is selected

      const maxTranslateX = window.width / 4;
      const maxTranslateY = window.height / 4;

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
      const [texts, images] = getCanvasObjects('all');
      const hit = [...texts, ...images].find(obj => {
        const { x, y, width, height } = obj;

        return (
          event.x >= x &&
          event.x <= x + width &&
          event.y >= y &&
          event.y <= y + height
        );
      });

      if (hit) {
        selectedX.value = hit.x;
        selectedY.value = hit.y;
        selectObject(hit.id, hit.type);
      } else {
        selectTextToEdit('');
        selectObject('', 'text');
      }
    })
    .runOnJS(true);

  // edit text value
  const doubleTapToEditText = Gesture.Tap()
    .maxDuration(200)
    .numberOfTaps(2)
    .onEnd(() => {
      if (selected.type === 'text') {
        selectTextToEdit(selected.id);
      }
    })
    .runOnJS(true);

  /**
   * Object dragging after selection
   */
  const objectDragGesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      if (!selected.id) return;

      // we need to init the current position first
      selectedX.value = selected.spec?.x || 0;
      selectedY.value = selected.spec?.y || 0;
    })
    .onUpdate(e => {
      if (!selected.id) return;

      const maxTranslateX = window.width;
      const maxTranslateY = window.height;

      // prevent object drag going out of bounds
      selectedX.value = clamp(
        (selected.spec?.x || 0) + e.translationX,
        0,
        maxTranslateX,
      );
      selectedY.value = clamp(
        (selected.spec?.y || 0) + e.translationY,
        0,
        maxTranslateY,
      );
    })
    .onEnd(() => {
      if (!selected.id) return;

      updateObject({
        id: selected.id,
        type: selected.type,
        payload: {
          x: selectedX.value,
          y: selectedY.value,
        },
      });
    })
    .runOnJS(true);

  const canvasViewGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapToEditText,
    singleTapToSelect,
  );

  return {
    canvasViewGesture,
    objectDragGesture,
    scale,
    translationX,
    translationY,
    selectedX,
    selectedY,
  };
};

export default useCanvasGesture;
