import React, {PureComponent} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import * as Progress from 'react-native-progress';

import {fetchImageDetails, ImageItem, ImageItemDetails} from '../api/requests';

interface Props {
  route: RouteProp<any, any>;
}

interface State {
  imageDetails?: ImageItemDetails;
}

export default class ImageDetails extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageDetails: undefined,
    };
  }

  async componentDidMount() {
    const imageItem: ImageItem = this.props.route.params?.imageItem;
    const details = await fetchImageDetails(imageItem.imageId);
    this.setState({imageDetails: details});
  }

  render() {
    const {imageDetails} = this.state;

    return (
      <View>
        {!imageDetails ? (
          this.renderLoading()
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: this.getImageUrl(),
              }}
            />
            <Text style={styles.text}>{imageDetails.authorName}</Text>
            <Text style={styles.text}>{imageDetails.title}</Text>
            <Text style={styles.text}>{imageDetails.description}</Text>
          </ScrollView>
        )}
      </View>
    );
  }

  getImageUrl = () => {
    const imageItem = this.props.route.params?.imageItem;
    return `https://live.staticflickr.com/${imageItem.serverId}/${imageItem.imageId}_${imageItem.secret}_b.jpg`;
  };

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Progress.CircleSnail
        thickness={3}
        duration={1000}
        size={40}
        indeterminate={true}
        color={'gray'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
  text: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
