import React from 'react';
import { View } from 'react-native';
import { toolbarStyle } from './toolbar.style';
import ToolbarAdd from './common/toolbar-add';
import ToolbarCopy from './common/toolbar-copy';
import ToolbarDelete from './common/toolbar-delete';
import ToolbarEditStyle from './common/toolbar-edit-style';

const Toolbar = () => (
  <View style={toolbarStyle.container}>
    <View style={toolbarStyle.items}>
      <ToolbarAdd />
      <ToolbarEditStyle />
      <ToolbarCopy />
      <ToolbarDelete />
    </View>
  </View>
);

export default Toolbar;
