import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC } from 'react';
import { Text } from 'react-native';

interface Props {
  title: string;
  children: React.ReactNode;
}

const EditSection: FC<Props> = ({ children, title }) => {
  return (
    <BottomSheetView style={{ flexDirection: 'column', gap: 10 }}>
      <Text style={{ fontSize: 14, fontWeight: 700 }}>{title}</Text>
      {children}
    </BottomSheetView>
  );
};

export default EditSection;
