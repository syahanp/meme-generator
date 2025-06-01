import theme from '@/theme';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { FC } from 'react';

type Props = BottomSheetBackdropProps & {
  backgroundColor?: string;
};

const BottomSheetCustomBackdrop: FC<Props> = ({
  style,
  backgroundColor = theme.colors.grey[900],
  ...props
}) => {
  return (
    <BottomSheetBackdrop {...props} style={[style, { backgroundColor }]} />
  );
};

export default BottomSheetCustomBackdrop;
