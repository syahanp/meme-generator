export const generateUUID = (): string => {
  return (
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10)
  );
};

/**
 * Get random coordinate relative to canvas,
 * so X is always between canvasX and canvasX + canvasWidth
 * and Y is always between canvasY and canvasY + canvasHeight
 */
export const getCoordRelativeToCanvas = ({
  canvasX,
  canvasY,
  canvasWidth,
  canvasHeight,
}: {
  canvasX: number;
  canvasY: number;
  canvasWidth: number;
  canvasHeight: number;
}): { x: number; y: number } => {
  const randomX =
    canvasX + Math.floor(Math.random() * (canvasWidth - 50 + 1)) + 10;
  const randomY =
    canvasY + Math.floor(Math.random() * (canvasHeight - 50 + 1)) + 10;

  return { x: randomX, y: randomY };
};
