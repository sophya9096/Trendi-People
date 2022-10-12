import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Button,
  StatusBar,
  Platform,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';
import {Header} from 'react-native-elements';
import * as CONSTANT from '../Constants/Constant';
class CustomHeader extends Component {
  state = {
    storedType: '',
    profileImg: '',
  };
  componentWillMount() {
    this.CheckApplicationAccess();
    this.getUser();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ApplicationAccessServcie: json.access_type.service_access});
    this.setState({ApplicationAccessJob: json.access_type.job_access});
  };
  showSearch = () => {
    this.props.navigation.navigate('SearchScreen');
  };
  showProfile = () => {
    this.props.navigation.navigate('Profile');
  };
  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  getUser = async () => {
    try {
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
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
    } catch (error) {
      // alert(error)
    }
  };
  checkAppAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({data: json});
  };
  render() {
    const {storedType, profileImg, permissionChat} = this.state;
    console.log('Chat Permission=', permissionChat, storedType);
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
        <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: '100%',
            backgroundColor: 'black',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '20%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <AntIcon
              name="menufold"
              size={25}
              color={'#fff'}
              onPress={this.toggleDrawer}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.showSearch}
            style={{
              flexDirection: 'column',
              width: '60%',
              backgroundColor: 'white',
              borderRadius: 20,
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '300',
                    color: 'black',
                    height: 30,
                    marginTop: 5,
                  }}>
                  {CONSTANT.searchHeader}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.showProfile}
            style={{
              flexDirection: 'column',
              width: '20%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'flex-end',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignSelf: 'flex-end',
                }}>
                {/* <AntIcon name="search1" size={25} color={'#fff'} /> */}
                <Image
                  source={{uri: `${profileImg}`}}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    borderWidth: 0.6,
                    borderColor: CONSTANT.color,
                  }}
                />
                <Image />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withNavigation(CustomHeader);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.primaryColor,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
  },
});
