import theme from '@/theme';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  solid: {
    backgroundColor: theme.colors.blue[500],
    borderColor: theme.colors.blue[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.blue[500],
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  solidText: {
    color: '#fff',
  },
  outlineText: {
    color: theme.colors.blue[500],
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: theme.colors.grey[400],
  },
});
