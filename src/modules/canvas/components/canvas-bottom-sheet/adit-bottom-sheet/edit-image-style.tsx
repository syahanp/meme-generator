import React from 'react';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { ImageObject } from '@/modules/canvas/provider/canvas-provider.type';
import EditOpacity from './common/edit-opacity';

const EditImageStyle = () => {
  const { selected } = useCanvasProvider();

  /**
   * we assume that the selected object is a text object.
   * If not, this component won't render for sure
   */
  const selectedImage = selected.spec as ImageObject;

  return <EditOpacity key={selected.id} selectedImage={selectedImage} />;
};

export default EditImageStyle;
