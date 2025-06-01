import theme from '@/theme';
import React, { FC, JSX } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = PressableProps & {
  label: string;
  Icon: (props: SvgProps) => JSX.Element;
};

const AddNewItem: FC<Props> = ({ Icon, label, ...props }) => (
  <Pressable
    {...props}
    style={{
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <Icon width={24} height={24} stroke={theme.colors.grey[900]} />
    <Text
      style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.grey[900],
      }}
    >
      {label}
    </Text>
  </Pressable>
);

export default AddNewItem;
