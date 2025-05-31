import theme from '@/theme';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { FC } from 'react';

const BottomSheetCustomBackdrop: FC<BottomSheetBackdropProps> = ({
  style,
  ...props
}) => {
  return (
    <BottomSheetBackdrop
      {...props}
      style={[style, { backgroundColor: theme.colors.grey[600] }]}
    />
  );
};

export default BottomSheetCustomBackdrop;
