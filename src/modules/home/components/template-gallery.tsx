import { imagePath } from '@/constants/images';
import theme from '@/theme';
import React, { FC } from 'react';
import { Dimensions, FlatList, Image, Pressable } from 'react-native';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const spacing = 8;
const imageSize = (screenWidth - spacing - 12 * (numColumns + 1)) / numColumns;

interface Props {
  onSelectTemplate: (key: string) => void;
}

const TemplateGallery: FC<Props> = ({ onSelectTemplate }) => {
  return (
    <FlatList
      data={Object.entries(imagePath)}
      keyExtractor={([key, _]) => key}
      numColumns={2}
      renderItem={({ item: [key, imgSrc] }) => (
        <Pressable
          onPress={() => onSelectTemplate(key)}
          style={{
            margin: spacing / 2,
          }}
        >
          <Image
            source={imgSrc}
            resizeMode="contain"
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.colors.grey[400],
            }}
          />
        </Pressable>
      )}
    />
  );
};

export default TemplateGallery;
