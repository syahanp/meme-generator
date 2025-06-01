import React from 'react';
import { useCanvasProvider } from '@/modules/canvas/provider/canvas-provider';
import { TextObject } from '@/modules/canvas/provider/canvas-provider.type';
import EditFontFamily from './common/edit-font-family';
import EditFontWeight from './common/edit-font-weight';
import EditColor from './common/edit-color';
import EditFontSize from './common/edit-font-size';

const EditTextStyle = () => {
  const { selected } = useCanvasProvider();
  /**
   * we assume that the selected object is a text object.
   * If not, this component won't render for sure
   */
  const selectedTextObject = selected.spec as TextObject;

  return (
    <>
      <EditFontFamily key={selected.id} selectedText={selectedTextObject} />
      <EditFontWeight key={selected.id} selectedText={selectedTextObject} />
      <EditColor key={selected.id} selectedText={selectedTextObject} />
      <EditFontSize key={selected.id} selectedText={selectedTextObject} />
    </>
  );
};

export default EditTextStyle;
