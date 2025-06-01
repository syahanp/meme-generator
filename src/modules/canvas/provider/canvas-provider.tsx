import BottomSheet from '@gorhom/bottom-sheet';
import React, {
  createContext,
  FC,
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
  GetCanvasObjectReturn,
  ImageObject,
  SelectedObjectType,
  TextObject,
} from './canvas-provider.type';

const CanvasContextProvider = createContext<CanvasProviderType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
  route: CanvasProviderType['route'];
}

export const CanvasProvider: FC<Props> = ({ children, route }) => {
  const addNewSheet = useRef<BottomSheet>(null);
  const editSheet = useRef<BottomSheet>(null);

  const [editingTextById, setEditingTextById] = useState('');
  const [selectedObject, setSelectedObject] = useState<SelectedObjectType>({
    id: '',
    type: 'text',
  });
  const [textObjects, setTextObjects] = useState<TextObject[]>([]);
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);

  /**
   * Canvas object getter
   *
   * usage:
   * const textObjects = getCanvasObjects('text')
   * const imageObjects = getCanvasObjects('image')
   * const [textObjects, imageObjects] = getCanvasObjects('all')
   */
  const getCanvasObjects: CanvasProviderType['getCanvasObjects'] = useCallback(
    type => {
      if (type === 'text')
        return textObjects as GetCanvasObjectReturn<typeof type>;
      if (type === 'image')
        return imageObjects as GetCanvasObjectReturn<typeof type>;

      return [textObjects, imageObjects] as GetCanvasObjectReturn<typeof type>;
    },
    [textObjects, imageObjects],
  );

  const selected = useMemo(
    () => ({
      type: selectedObject.type,
      id: selectedObject.id,
      spec: (() => {
        if (selectedObject.type === 'text') {
          return textObjects.find(obj => obj.id === selectedObject.id);
        }

        return imageObjects.find(obj => obj.id === selectedObject.id);
      })(),
    }),
    [imageObjects, selectedObject.id, selectedObject.type, textObjects],
  );

  /**
   * Update object spec on canvas based on object type
   */
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
            obj.width = payload.width || obj.width;
            obj.height = payload.height || obj.height;
          }),
        );
      }

      if (type === 'image') {
        setImageObjects(
          produce(draft => {
            const obj = draft.find(item => item.id === id);
            if (!obj) return;

            obj.x = payload.x || obj.x;
            obj.y = payload.y || obj.y;
            obj.opacity = payload.opacity || obj.opacity;
            obj.url = payload.url || obj.url;
            obj.width = payload.width || obj.width;
            obj.height = payload.height || obj.height;
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

  /**
   * Add new text to canvas
   *
   * Payload: supply initial text specification if any
   * Options:
   *  - auto: 'select' for auto select after adding or for example, after copying
   *          'edit-text' for edit mode right after adding
   */
  const addNewText: CanvasProviderType['addNewText'] = useCallback(
    (payload, options) => {
      const initialCoordinate = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

      const initSpec: TextObject = {
        type: 'text',
        id: payload?.id || generateUUID(),
        x: payload?.x || initialCoordinate,
        y: payload?.y || initialCoordinate,
        width: payload?.width || 150,
        height: payload?.height || 40,
        value: payload?.value || 'Text',
        fontFamily: payload?.fontFamily || 'Poppins',
        fontSize: payload?.fontSize || 18,
        fontWeight: payload?.fontWeight || 'regular',
        color: payload?.color || 'black',
      };

      setTextObjects(prev => [...prev, initSpec]);

      if (options?.auto === 'select') {
        setSelectedObject({ id: initSpec.id, type: 'text' });
      }

      if (options?.auto === 'edit-text') {
        setTimeout(() => {
          setSelectedObject({ id: initSpec.id, type: 'text' });
          setEditingTextById(initSpec.id);
        }, 10);
      }
    },
    [],
  );

  /**
   * Add new text to canvas
   *
   * Payload: supply initial text specification if any
   * Options:
   *  - auto: 'select' for auto select after adding or for example, after copying
   */
  const addNewImage: CanvasProviderType['addNewImage'] = useCallback(
    (payload, options) => {
      const initSpec: ImageObject = {
        type: 'image',
        id: payload?.id || generateUUID(),
        x: payload?.x || 100,
        y: payload?.y || 100,
        width: payload?.width || 150,
        height: payload?.height || 150,
        url: payload?.url || 'https://picsum.photos/200/300',
        opacity: payload?.opacity || 1,
      };

      setImageObjects(prev => [...prev, initSpec]);

      if (options?.auto === 'select') {
        setSelectedObject({ id: initSpec.id, type: 'image' });
      }
    },
    [],
  );

  /**
   * Delete object from canvas
   */
  const deleteObject: CanvasProviderType['deleteObject'] = useCallback(
    (type, id) => {
      if (type === 'text') {
        setTextObjects(prev => prev.filter(item => item.id !== id));
      }

      if (type === 'image') {
        setImageObjects(prev => prev.filter(item => item.id !== id));
      }

      setSelectedObject({ id: '', type: 'text' });
    },
    [],
  );

  const selectTextToEdit: CanvasProviderType['selectTextToEdit'] = useCallback(
    id => {
      setEditingTextById(id);
    },
    [],
  );

  const contextValue: CanvasProviderType = useMemo(
    () => ({
      route,
      addNewSheet,
      editSheet,
      getCanvasObjects,
      selectObject,
      addNewText,
      addNewImage,
      deleteObject,
      updateObject,
      selectTextToEdit,
      editingTextById,
      selected,
    }),
    [
      route,
      addNewSheet,
      editSheet,
      getCanvasObjects,
      selectObject,
      addNewText,
      addNewImage,
      deleteObject,
      updateObject,
      selectTextToEdit,
      editingTextById,
      selected,
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
