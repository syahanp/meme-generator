import theme from '@/theme';
import BottomSheet from '@gorhom/bottom-sheet';

export type ObjectType = 'text' | 'image' | 'empty';
export interface SelectedObjectType {
  id: string;
  type: ObjectType;
}
export type FontFamilyType = 'Poppins' | 'Playfair' | 'Inter';
export type FontWeightType = '400' | '700';

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

export type TextObject = TextSpec & Omit<ObjectSpec, 'height'>;
export type ImageObject = ImageSpec & ObjectSpec;

type UpdatePayload =
  | { type: 'text'; id: string; payload: Partial<TextObject> }
  | { type: 'image'; id: string; payload: Partial<ImageObject> }
  | { type: 'empty'; id: string; payload: null };

export interface CanvasProviderType {
  addNewSheet: React.RefObject<BottomSheet | null>;
  editSheet: React.RefObject<BottomSheet | null>;
  textObjects: TextObject[];
  addNewText: () => void;
  deleteObject: (type: ObjectType, id: string) => void;
  updateObject: ({ id, type, payload }: UpdatePayload) => void;

  selectedObject: SelectedObjectType;
  selectObject: (id: string, type: ObjectType) => void;

  selectedTextObject: TextObject;
}
