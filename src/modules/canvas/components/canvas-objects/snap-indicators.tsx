import { canvasSpec } from '@/constants/canvas-config';
import theme from '@/theme';
import { Line, vec } from '@shopify/react-native-skia';
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

const window = Dimensions.get('window');
const { canvasCenterX, canvasCenterY } = canvasSpec;

interface SnapIndicatorsProps {
  horizontalSnapOpacity: SharedValue<number>;
  verticalSnapOpacity: SharedValue<number>;
}

const SnapIndicators: FC<SnapIndicatorsProps> = ({
  horizontalSnapOpacity,
  verticalSnapOpacity,
}) => {
  return (
    <>
      <Line
        p1={vec(canvasCenterX, 0)}
        p2={vec(canvasCenterX, window.height)}
        color={theme.colors.red[300]}
        style="stroke"
        strokeWidth={1}
        opacity={verticalSnapOpacity}
      />
      <Line
        p1={vec(0, canvasCenterY)}
        p2={vec(window.width, canvasCenterY)}
        color={theme.colors.red[300]}
        style="stroke"
        strokeWidth={1}
        opacity={horizontalSnapOpacity}
      />
    </>
  );
};

export default SnapIndicators;
