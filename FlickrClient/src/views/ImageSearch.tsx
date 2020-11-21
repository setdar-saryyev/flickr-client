import React, {PureComponent} from 'react';
import {View, StyleSheet, TextInput, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import * as Progress from 'react-native-progress';

import ListItem from '../components/ListItem';

import {startSearch} from '../actions/searchActions';
import {ImageItem} from '../api/requests';

interface Props {
  navigation: StackNavigationProp<any, any>;
  isLoading: boolean;
  imagesData: Array<ImageItem>;

  startLoading: (query: string) => void;
}

interface State {
  imageName: string;
}

class ImageSearch extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageName: '',
    };
  }

  render() {
    const {imageName} = this.state;
    const {isLoading, imagesData} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={imageName}
            allowFontScaling={false}
            autoFocus
            underlineColorAndroid="transparent"
            placeholder={'Enter name'}
            returnKeyType="done"
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmit}
          />
        </View>

        {isLoading ? (
          this.renderLoading()
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={imagesData}
            keyExtractor={(item, _) => item.imageId}
            renderItem={({item}: {item: ImageItem}) => (
              <ListItem item={item} onPress={() => this.onItemPress(item)} />
            )}
          />
        )}
      </View>
    );
  }

  onSubmit = () => {
    const {imageName} = this.state;
    const {startLoading} = this.props;
    startLoading(imageName);
  };

  onChangeText = (value: string) => this.setState({imageName: value});

  onItemPress = (item: ImageItem) => {
    this.props.navigation.navigate('ImageDetails', {imageItem: item});
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.imageSearchReducer.isLoading,
    imagesData: state.imageSearchReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: (payload: string) => {
      dispatch(startSearch(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSearch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    padding: 8,
    backgroundColor: '#d5e0f2',
    borderRadius: 6,
  },
  list: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
