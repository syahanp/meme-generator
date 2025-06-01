import theme from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const toolbarStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth * 0.9,
    left: (screenWidth - screenWidth * 0.9) / 2,
    bottom: 45,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    shadowColor: theme.colors.grey[500],
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    elevation: 5,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '25%',
  },
});
