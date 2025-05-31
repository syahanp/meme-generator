import theme from '@/theme';
import React, { FC, JSX } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { toolbarStyle } from './toolbar.style';

type Props = PressableProps & {
  label: string;
  Icon: (props: SvgProps) => JSX.Element;
  isActive: boolean;
  color?: string;
};

const ToolbarItem: FC<Props> = ({ Icon, label, isActive, color, ...props }) => (
  <Pressable {...props} style={toolbarStyle.item} aria-disabled={!isActive}>
    <Icon
      width={20}
      height={20}
      color={
        isActive ? (color ?? theme.colors.grey[800]) : theme.colors.grey[400]
      }
    />
    <Text
      style={{
        color: isActive
          ? (color ?? theme.colors.grey[800])
          : theme.colors.grey[400],
        fontWeight: '500',
      }}
    >
      {label}
    </Text>
  </Pressable>
);

export default ToolbarItem;
