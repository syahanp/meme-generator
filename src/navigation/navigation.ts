import {
  RouteProp,
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation.type';

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export const useNavigation = () => useNativeNavigation<AppNavigation>();
export const useRoute = () => useNativeRoute<RouteProp<RootStackParamList>>();
