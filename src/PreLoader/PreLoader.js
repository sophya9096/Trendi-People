import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  AsyncStorage,
  ART,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import * as CONSTANT from '../Constants/Constant';
class PreLoader extends Component {
  state = {
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    showAlert: false,
  };
  componentDidMount() {
    setTimeout(() => {
      this._checkUserLoginStatus();
    }, 1000);
  }
  _checkUserLoginStatus = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      console.log(storedValue, storedType, profileImg, type);
      if (storedValue != null) {
        this.props.navigation.navigate('Container');
        // this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Welcome');
      }
      if (storedType !== null) {
        this.setState({storedType});
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({profileImg});
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({type});
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // Error saving data
      // alert(error)
      console.log(error);
      this.props.navigation.navigate('LoginScreen');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'android' ? (
          <StatusBar
            backgroundColor={CONSTANT.statusBarColor}
            barStyle="light-content"
          />
        ) : (
          <StatusBar hidden />
        )}
        <Image
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            opacity: 0.4,
          }}
          source={require('../Images/splashbackground.png')}
        />
        <View
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
          }}>
          <Image
            resizeMode={'contain'}
            style={{width: 250, resizeMode: 'center', alignSelf: 'center'}}
            source={require('../Images/logo.png')}
          />
          <ActivityIndicator color="#fff" />
        </View>
      </View>
    );
  }
}
export default PreLoader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#000000',
    alignItems: 'center',
  },
});
