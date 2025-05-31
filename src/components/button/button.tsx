import React from 'react';
import { Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { buttonStyles } from './button.style';

type Variant = 'solid' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button = ({
  children,
  onPress,
  variant = 'solid',
  style,
  textStyle,
  disabled = false,
}: ButtonProps) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        buttonStyles.base,
        isOutline ? buttonStyles.outline : buttonStyles.solid,
        disabled && buttonStyles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          buttonStyles.label,
          isOutline ? buttonStyles.outlineText : buttonStyles.solidText,
          disabled && buttonStyles.disabledText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
