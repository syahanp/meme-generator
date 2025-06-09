import { canvasSpec, SNAP_TOLERANCE } from '@/constants/canvas-config';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, clamp, withTiming } from 'react-native-reanimated';

const window = Dimensions.get('window');
const { canvasCenterX, canvasCenterY } = canvasSpec;

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

  // object property
  const selectedX = useSharedValue(0);
  const selectedY = useSharedValue(0);
  const sharedSelectedId = useSharedValue('');

  // snap indicators
  const verticalSnapOpacity = useSharedValue(0);
  const horizontalSnapOpacity = useSharedValue(0);

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

  // select object
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
        sharedSelectedId.value = hit.id;
        selectObject(hit.id, hit.type);
      } else {
        sharedSelectedId.value = '';
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

  // drag object
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

      const objectWidth = selected.spec?.width || 0;
      const objectHeight = selected.spec?.height || 0;

      // prevent dragging out of canvas
      const maxDragX = window.width - objectWidth;
      const maxDragY = window.height - objectHeight;

      const newX = (selected.spec?.x || 0) + e.translationX;
      const newY = (selected.spec?.y || 0) + e.translationY;

      const objectCenterX = newX + objectWidth / 2;
      const objectCenterY = newY + objectHeight / 2;

      // initially assign position to snapped position
      let snappedX = newX;
      let snappedY = newY;

      // is dragged object are snapped?
      const isSnappedX =
        Math.abs(objectCenterX - canvasCenterX) < SNAP_TOLERANCE;
      const isSnappedY =
        Math.abs(objectCenterY - canvasCenterY) < SNAP_TOLERANCE;

      // if snapped, force dragged object to snap center
      if (isSnappedX) {
        snappedX = canvasCenterX - objectWidth / 2;
      }
      if (isSnappedY) {
        snappedY = canvasCenterY - objectHeight / 2;
      }

      // withTiming is used to fade in/out snap indicators
      if (isSnappedX) {
        verticalSnapOpacity.value = withTiming(1, { duration: 150 });
      } else {
        verticalSnapOpacity.value = withTiming(0, { duration: 150 });
      }

      if (isSnappedY) {
        horizontalSnapOpacity.value = withTiming(1, { duration: 150 });
      } else {
        horizontalSnapOpacity.value = withTiming(0, { duration: 150 });
      }

      // prevent object drag going out of bounds
      selectedX.value = clamp(snappedX, 0, maxDragX);
      selectedY.value = clamp(snappedY, 0, maxDragY);
    })
    .onEnd(() => {
      if (!selected.id) return;

      verticalSnapOpacity.value = withTiming(0, { duration: 150 });
      horizontalSnapOpacity.value = withTiming(0, { duration: 150 });

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
    verticalSnapOpacity,
    horizontalSnapOpacity,
    sharedSelectedId,
  };
};

export default useCanvasGesture;
