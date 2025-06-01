import { RootStackParamList } from '@/navigation/navigation.type';
import theme from '@/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { RouteProp } from '@react-navigation/native';

export type ObjectType = 'text' | 'image';
export interface SelectedObjectType {
  id: string;
  type: ObjectType;
}
export type FontFamilyType = 'Poppins' | 'Playfair' | 'Inter';
export type FontWeightType = 'regular' | 'bold';

export interface ObjectSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObjectType;
}

export interface TextSpec {
  value: string;
  fontFamily: FontFamilyType;
  fontSize: number;
  fontWeight: FontWeightType;
  color: keyof typeof theme.colors;
}

export interface ImageSpec {
  url: string;
  opacity: number;
}

export type TextObject = TextSpec & ObjectSpec;
export type ImageObject = ImageSpec & ObjectSpec;

type UpdatePayload =
  | { type: 'text'; id: string; payload: Partial<TextObject> }
  | { type: 'image'; id: string; payload: Partial<ImageObject> };

// getter to dynamically get canvas objects by type or all types
export type GetCanvasObjectReturn<T extends ObjectType | 'all'> =
  T extends 'text'
    ? TextObject[]
    : T extends 'image'
      ? ImageObject[]
      : [TextObject[], ImageObject[]];

export interface CanvasProviderType {
  route: RouteProp<RootStackParamList>;
  addNewSheet: React.RefObject<BottomSheet | null>;
  editSheet: React.RefObject<BottomSheet | null>;
  getCanvasObjects: <T extends ObjectType | 'all'>(
    type: T,
  ) => GetCanvasObjectReturn<T>;

  addNewText: (
    payload?: Partial<TextObject>,
    options?: { auto: 'select' | 'edit-text' },
  ) => void;
  addNewImage: (
    payload?: Partial<ImageObject>,
    options?: { auto: 'select' | 'edit-text' },
  ) => void;

  deleteObject: (type: ObjectType | null, id: string) => void;
  updateObject: ({ id, type, payload }: UpdatePayload) => void;
  selectTextToEdit: (id: string) => void;
  selectObject: (id: string, type: ObjectType) => void;
  editingTextById: string;
  selected: {
    type: ObjectType;
    id: string;
    spec: TextObject | ImageObject | undefined;
  };
}
