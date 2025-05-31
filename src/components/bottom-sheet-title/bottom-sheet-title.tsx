import theme from '@/theme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { X } from 'react-native-feather';

interface Props {
  sheetRef: React.RefObject<BottomSheet | null>;
  title: string;
  onClose?: () => void;
}

const BottomSheetTitle: React.FC<Props> = ({ sheetRef, title, onClose }) => {
  const handleClose = () => {
    sheetRef.current?.close();
    onClose?.();
  };

  return (
    <BottomSheetView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{title}</Text>

      <Pressable onPress={handleClose}>
        <X color={theme.colors.grey[900]} width={24} height={24} />
      </Pressable>
    </BottomSheetView>
  );
};

export default BottomSheetTitle;
