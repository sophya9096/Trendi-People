import React, {Component, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import {CalloutSubview} from 'react-native-maps';
import axios from 'axios';
import home from '../Home/home';
import CustomHeader from '../Header/CustomHeader';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as CONSTANT from '../Constants/Constant';
class LoginScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isProgress: false,
    };
  }
  openProgressbar = () => {
    this.setState({isProgress: true});
  };
  login = () => {
    const {username, password} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username == '') {
      //alert("Please enter Email address");
      this.setState({email: 'Please enter Email address'});
    } else if (reg.test(username) === false) {
      //alert("Email is Not Correct");
      this.setState({email: 'Email is Not Correct'});
      return false;
    } else if (password == '') {
      this.setState({email: 'Please enter password'});
    } else {
      // this.openProgressbar();
      axios
        .post(CONSTANT.BaseUrl + 'user/do_login', {
          username: username,
          password: password,
        })
        .then(async response => {
          if (response.data.type == 'success') {
            await AsyncStorage.setItem(
              'full_name',
              response.data.profile.pmeta.full_name,
            );
            await AsyncStorage.setItem(
              'user_type',
              response.data.profile.pmeta.user_type,
            );
            await AsyncStorage.setItem(
              'profile_img',
              response.data.profile.pmeta.profile_img,
            );
            await AsyncStorage.setItem(
              'listing_type',
              response.data.profile.umeta.listing_type,
            );
            await AsyncStorage.setItem(
              'profileBanner',
              response.data.profile.pmeta.banner_img,
            );
            await AsyncStorage.setItem('profileType', response.data.type);
            await AsyncStorage.setItem(
              'projectUid',
              response.data.profile.umeta.id,
            );
            await AsyncStorage.setItem(
              'projectProfileId',
              JSON.stringify(response.data.profile.umeta.profile_id),
            );
            await AsyncStorage.setItem(
              'chatPermission',
              response.data.profile.umeta.chat_permission,
            );
            await AsyncStorage.setItem(
              'shipping_address1',
              response.data.profile.shipping.address_1,
            );
            await AsyncStorage.setItem(
              'shipping_city',
              response.data.profile.shipping.city,
            );
            await AsyncStorage.setItem(
              'shipping_company',
              response.data.profile.shipping.company,
            );
            await AsyncStorage.setItem(
              'shipping_country',
              response.data.profile.shipping.country,
            );
            await AsyncStorage.setItem(
              'shipping_first_name',
              response.data.profile.shipping.first_name,
            );
            await AsyncStorage.setItem(
              'shipping_last_name',
              response.data.profile.shipping.last_name,
            );
            await AsyncStorage.setItem(
              'shipping_state',
              response.data.profile.shipping.state,
            );
            await AsyncStorage.setItem(
              'billing_address_1',
              response.data.profile.billing.address_1,
            );
            await AsyncStorage.setItem(
              'billing_city',
              response.data.profile.billing.city,
            );
            await AsyncStorage.setItem(
              'billing_company',
              response.data.profile.billing.company,
            );
            await AsyncStorage.setItem(
              'billing_country',
              response.data.profile.billing.country,
            );
            await AsyncStorage.setItem(
              'billing_first_name',
              response.data.profile.billing.first_name,
            );
            await AsyncStorage.setItem(
              'billing_last_name',
              response.data.profile.billing.last_name,
            );
            await AsyncStorage.setItem(
              'billing_email',
              response.data.profile.billing.email,
            );
            await AsyncStorage.setItem(
              'billing_phone',
              response.data.profile.billing.phone,
            );
            await AsyncStorage.setItem(
              'billing_state',
              response.data.profile.billing.state,
            );
            await AsyncStorage.setItem(
              'peojectJobAccess',
              response.data.profile.umeta.job_access,
            );
            await AsyncStorage.setItem(
              'projectServiceAccess',
              response.data.profile.umeta.service_access,
            );
            this.setState({isProgress: false});
            RNRestart.Restart();
          } else if (response.data.type === 'error') {
            this.setState({isProgress: false});
            alert('Invalid Credentials');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  render() {
    const passwordInputRef = createRef();
    return this.state.isProgress ? (
      <CustomProgressBar />
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}>
        <Image
          source={require('../../src/Images/wizardbackground.png')}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.4,
            position: 'relative',
          }}
        />
        <View
          style={{
            position: 'absolute',
            flex: 1,
            left: 0,
            // top: '5%',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{}}>
            <Image
              style={{
                width: 250,
                resizeMode: 'center',
              }}
              source={require('../../src/Images/logo.png')}
            />
          </View>
          <Text
            style={{
              color: '#fff',
              fontSize: 36,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 2,
              fontWeight: '100',
            }}>
            {CONSTANT.DrawerLogin}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 2,
              fontWeight: '100',
            }}>
            enter your details to login
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 300,
                borderColor: '#ffffff',
                borderRadius: 5,
                height: 60,
                borderWidth: 2,
                paddingHorizontal: 20,
                marginTop: 20,
                display: 'flex',
              }}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                placeholder="Email"
                placeholderTextColor="white"
                style={{
                  color: 'white',
                  flex: 1,
                  backgroundColor: 'transparent',
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                underlineColorAndroid="transparent"
                name="username"
                onChangeText={username => this.setState({username})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 300,
                borderColor: '#ffffff',
                borderRadius: 5,
                height: 60,
                borderWidth: 2,
                paddingHorizontal: 20,
                marginTop: 20,
                display: 'flex',
              }}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="password"
                placeholder="Password"
                placeholderTextColor="white"
                style={{
                  color: 'white',
                  flex: 1,
                  backgroundColor: 'transparent',
                }}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                editable={true}
                secureTextEntry={true}
                name="password"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={password => this.setState({password})}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={this.login}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: CONSTANT.primaryColor,
                borderRadius: 5,
                width: 140,
                height: 50,
                marginTop: 20,
              }}>
              <Text
                style={{
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  color: CONSTANT.color,
                  fontSize: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  fontWeight: '100',
                }}>
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  fontWeight: '100',
                }}>
                Don't have an account?
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    fontWeight: 'bold',
                    marginLeft: 4,
                  }}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const CustomProgressBar = ({visible}) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View
      style={{
        flex: 1,
        backgroundColor: '#dcdcdc',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          padding: 25,
          position: 'absolute',
        }}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Loading</Text>
        <ActivityIndicator size="large" color={CONSTANT.primaryColor} />
      </View>
    </View>
  </Modal>
);
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    height: '77%',
    marginBottom: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
