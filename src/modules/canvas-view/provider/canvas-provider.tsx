import BottomSheet from '@gorhom/bottom-sheet';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generateUUID } from '@/helper/common';
import { produce } from 'immer';
import {
  CanvasProviderType,
  SelectedObjectType,
  TextObject,
} from './canvas-provider.type';

const CanvasContextProvider = createContext<CanvasProviderType | undefined>(
  undefined,
);

export const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedObject, setSelectedObject] = useState<SelectedObjectType>({
    id: '',
    type: 'empty',
  });
  const [textObjects, setTextObjects] = useState<TextObject[]>([]);

  const selectedTextObject = useMemo(
    () => textObjects.find(obj => obj.id === selectedObject.id),
    [selectedObject.id, textObjects],
  ) as TextObject;

  const addNewSheet = useRef<BottomSheet>(null);
  const editSheet = useRef<BottomSheet>(null);

  const updateObject: CanvasProviderType['updateObject'] = useCallback(
    ({ id, type, payload }) => {
      if (type === 'text') {
        setTextObjects(
          produce(draft => {
            const obj = draft.find(item => item.id === id);
            if (!obj) return;

            obj.x = payload.x || obj.x;
            obj.y = payload.y || obj.y;
            obj.fontFamily = payload.fontFamily || obj.fontFamily;
            obj.fontSize = payload.fontSize || obj.fontSize;
            obj.fontWeight = payload.fontWeight || obj.fontWeight;
            obj.color = payload.color || obj.color;
            obj.value = payload.value || obj.value;
          }),
        );
      }
    },
    [],
  );

  const selectObject: CanvasProviderType['selectObject'] = useCallback(
    (id, type) => {
      setSelectedObject({ id, type });
    },
    [],
  );

  const addNewText: CanvasProviderType['addNewText'] = useCallback(() => {
    const initSpec: TextObject = {
      id: generateUUID(),
      x: 100,
      y: 100,
      width: 150,
      type: 'text',
      value: 'Hello World',
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '400',
      color: 'black',
    };

    setTextObjects(prev => [...prev, initSpec]);
  }, []);

  const deleteObject: CanvasProviderType['deleteObject'] = useCallback(
    (type, id) => {
      if (type === 'text') {
        setTextObjects(prev => prev.filter(item => item.id !== id));
      }

      setSelectedObject({ id: '', type: 'empty' });
    },
    [],
  );

  const contextValue: CanvasProviderType = useMemo(
    () => ({
      addNewSheet,
      editSheet,
      textObjects,
      selectedObject,
      selectObject,
      addNewText,
      deleteObject,
      updateObject,
      selectedTextObject,
    }),
    [
      addNewSheet,
      editSheet,
      textObjects,
      selectedObject,
      selectObject,
      addNewText,
      deleteObject,
      updateObject,
      selectedTextObject,
    ],
  );

  return (
    <CanvasContextProvider.Provider value={contextValue}>
      {children}
    </CanvasContextProvider.Provider>
  );
};

export const useCanvasProvider = () => {
  const context = useContext(CanvasContextProvider);

  if (!context) {
    throw new Error(
      'useCanvasProvider must be used within a CanvasContextProvider',
    );
  }

  return context;
};
