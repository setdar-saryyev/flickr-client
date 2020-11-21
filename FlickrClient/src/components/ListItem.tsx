import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ImageItem} from '../api/requests';

interface Props {
  item: ImageItem;
  onPress: () => void;
}

export default class ImageSearch extends PureComponent<Props> {
  render() {
    const {onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.infoWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: this.getImageUrl(),
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  getImageUrl = () => {
    const {item} = this.props;
    return `https://live.staticflickr.com/${item.serverId}/${item.imageId}_${item.secret}.jpg`;
  };
}

const styles = StyleSheet.create({
  infoWrapper: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  image: {
    width: 400,
    height: 400,
  },
});
