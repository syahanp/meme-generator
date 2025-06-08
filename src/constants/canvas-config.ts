import { Dimensions } from 'react-native';

const window = Dimensions.get('screen');

/**
 * Tolerance of how much the object can be moved before being snapped.
 * if object closer to the center of the canvas, it will be snapped.
 * otherwise, it can be moved freely.
 */
export const SNAP_TOLERANCE = 15;

/**
 * Text addition config
 */
export const textConfig = {
  widthPadding: 16,
  heightPadding: 8,
  translateX: -8,
  translateY: -4,
};

/**
 * Canvas Specification
 */
export const canvasSpec = (() => {
  const canvasX = 25;
  const canvasWidth = window.width - canvasX * 2;
  const canvasHeight = canvasWidth;
  const canvasY = window.height / 2 - canvasWidth;

  const canvasCenterX = window.width / 2;
  const canvasCenterY = canvasY + canvasHeight / 2;

  return {
    canvasX,
    canvasY,
    canvasWidth,
    canvasHeight,
    canvasCenterX,
    canvasCenterY,
  };
})();
