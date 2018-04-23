import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import renderIcon from '../helpers/renderIcon';
import ViewPropTypes from '../config/ViewPropTypes';

import Input from '../input/Input';

const SCREEN_WIDTH = Dimensions.get('window').width;
const defaultSearchIcon = {
  type: 'material-community',
  size: 18,
  name: 'magnify',
  color: colors.grey3,
};
const defaultClearIcon = {
  type: 'material-community',
  size: 18,
  name: 'close',
  color: colors.grey3,
};

class SearchBar extends Component {
  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    this.blur();
    this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus();
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur();
    this.setState({ hasFocus: false });
  };

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({ isEmpty: text === '' });
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      isEmpty: true,
    };
  }

  render() {
    const {
      lightTheme,
      round,
      clearIcon,
      containerStyle,
      searchIcon,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputContainerStyle,
      inputStyle,
      noIcon,
      showLoading,
      loadingProps,
      placeholderTextColor,
      ...attributes
    } = this.props;
    const { isEmpty } = this.state;
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    return (
      <View
        style={[
          styles.container,
          containerStyle,
          lightTheme && styles.containerLight,
        ]}
      >
        <Input
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => (this.input = input)}
          placeholderTextColor={placeholderTextColor}
          inputStyle={[styles.input, inputStyle]}
          inputContainerStyle={[
            styles.inputContentContainer,
            inputContainerStyle,
            lightTheme && styles.inputLight,
            round && styles.round,
          ]}
          containerStyle={styles.inputContainer}
          leftIcon={renderIcon(searchIcon, defaultSearchIcon)}
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {showLoading && (
                <ActivityIndicator
                  style={[
                    clearIcon && !isEmpty && { marginRight: 10 },
                    loadingStyle,
                  ]}
                  {...otherLoadingProps}
                />
              )}
              {!isEmpty && renderIcon(clearIcon, defaultClearIcon)}
            </View>
          }
          rightIconContainerStyle={[
            styles.rightIconContainerStyle,
            rightIconContainerStyle,
          ]}
        />
      </View>
    );
  }
}

const elementOrObject = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.object,
]);
SearchBar.propTypes = {
  clearIcon: elementOrObject,
  searchIcon: elementOrObject,
  loadingProps: PropTypes.object,
  showLoading: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  leftIconContainerStyle: ViewPropTypes.style,
  rightIconContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  placeholderTextColor: PropTypes.string,
  lightTheme: PropTypes.bool,
  round: PropTypes.bool,
};

SearchBar.defaultProps = {
  loadingProps: {},
  showLoading: false,
  lightTheme: false,
  round: false,
  placeholderTextColor: colors.grey3,
  onClear: () => null,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null,
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderTopColor: '#000',
    backgroundColor: colors.grey0,
    padding: 8,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
  containerLight: {
    backgroundColor: colors.grey5,
    borderTopColor: '#e1e1e1',
    borderBottomColor: '#e1e1e1',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    color: colors.grey3,
  },
  inputContentContainer: {
    borderBottomWidth: 0,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: colors.searchBg,
    height: 30,
  },
  inputLight: {
    backgroundColor: colors.grey4,
  },
  round: {
    borderRadius: 15,
  },
});

export default SearchBar;
