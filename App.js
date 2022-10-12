import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  navigationOptions,
  CONST,
  TouchableOpacity,
  NativeModules,
  Alert,
  StatusBar,
  Button,
  SafeAreaView,
  ScrollView,
  Easing,
  Animated,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
  NetInfo,
  Linking
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  DrawerItems,
} from 'react-navigation';
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationEvents } from 'react-navigation';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import home from './src/Home/home';
import EmployerLayout from './src/Home/EmployerLayout';
import HomeCategories from './src/Home/HomeCategories';
import Employers from './src/CompleteEmployers/Employers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Jobs from './src/CompleteJobs/Jobs';
import Freelancers from './src/CompleteFreelancers/Freelancers';
import Profile from './src/ProfileSetting/Profile';
import FreelancerCategory from './src/Home/FreelancerCategory';
import DetailFreelancerScreen from './src/DetailFreelancer/DetailFreelancerScreen';
import DetailJobScreen from './src/DetailJobs/DetailJobScreen';
import DetailCompanyScreen from './src/DetailCompany/DetailCompanyScreen';
import DetailServiceScreen from './src/DetailServices/DetailServiceScreen';
import SearchScreen from './src/DetailSearch/SearchScreen';
import CustomHeader from './src/Header/CustomHeader';
import LoginScreen from './src/Login/LoginScreen';
import Container from './src/Login/Container';
import PostJob from './src/CompleteEmployers/PostJob';
import PostService from './src/CompleteServices/PostService';
import SendOffer from './src/DetailFreelancer/SendOffer';
import PreLoader from './src/PreLoader/PreLoader';
import Favorite from './src/Favorite/Favorite';
import SendProposal from './src/DetailJobs/SendProposal';
import SearchResultFreelancer from './src/DetailSearch/SearchResultFreelancer';
import SearchResultEmployer from './src/DetailSearch/SearchResultEmployer';
import SearchResultJob from './src/DetailSearch/SearchResultJob';
import SearchResultService from './src/DetailSearch/SearchResultService';
import Signup from './src/Login/Signup';
import VerificationAccount from './src/Login/VerificationAccount';
import ForgetPassword from './src/Login/ForgetPassword';
import JobbyCategorylist from './src/Home/JobbyCategorylist';
import SendReport from './src/DetailJobs/SendReport';
import BuyServiceScreen from './src/DetailServices/BuyServiceScreen';
import BuyServiceWebview from './src/DetailServices/BuyServiceWebview';
import MessagesList from './src/Messages/MessagesList';
import MessageSingleListCard from './src/Messages/MessageSigleListCard';
import DetailMessageScreen from './src/Messages/DetailMessageScreen';
import DetailOngoing from './src/Dashboard/DetailOngoing';
import SocketChat from './src/Messages/SocketChat';
import Insight from './src/Dashboard/Insight';
import Insightstar from './src/Dashboard/Insightstar';
import Packages from './src/Dashboard/Packages';
import LatestProposals from './src/ManageFreelancerProjects/LatestProposals';
import PostedServices from './src/ManageServices/PostedServices';
import CompletedServices from './src/ManageServices/CompletedServices';
import CompleteServicesDetail from './src/ManageServices/CompleteServicesDetail';
import OngoingServices from './src/ManageServices/OngoingServices';
import OngoingServicesDetail from './src/ManageServices/OngoingServicesDetail';
import AddonsServices from './src/ManageServices/AddonsServices';
import CancelledServices from './src/ManageServices/CancelledServices';
import OngoingJobs from './src/ManageJobs/OngoingJobs';
import PostedJobs from './src/ManageJobs/PostedJobs';
import * as CONSTANT from './src/Constants/Constant';
console.disableYellowBox = true;
let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  return {
    opacity,
    transform: [{ scaleY }],
  };
};
const TransitionConfiguration = () => {

  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: CollapseExpand(index, position, width),
      }[transition];
    },
  };
};
class App extends Component {
  state = {
    data: [],
  };
  constructor() {
    super();
    this.state = {
      connection_Status: '',
    };
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected == true) {
        this.setState({ connection_Status: 'Online' });
      } else {
        this.setState({ connection_Status: 'Offline' });
      }
    });
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }
  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({ connection_Status: 'Online' });
    } else {
      this.setState({ connection_Status: 'Offline' });
    }
  };
  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({ connection_Status: 'Online' });
    } else {
      this.setState({ connection_Status: 'Offline' });
    }
  };
  componentDidMount() {
    this.CheckApplicationAccess();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ data: json });
    console.log('This is Check Access json ' + JSON.stringify(json));
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS === 'android' ? (
          <StatusBar
            backgroundColor={CONSTANT.statusBarColor}
            barStyle="light-content"
          />
        ) : (
          <StatusBar hidden />
        )}
        {this.state.connection_Status === 'Offline' ? (
          <View style={{ flex: 1 }}>
            <Image
              style={{
                resizeMode: 'contain',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                textAlign: 'center',
              }}
              source={require('./src/Images/NoInternet.png')}
            />
          </View>
        ) : (
          <AppContainer />
        )}
      </SafeAreaView>
    );
  }
}
export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}>
        {Platform.OS === 'android' ? (
          <StatusBar
            backgroundColor={CONSTANT.statusBarColor}
            barStyle="light-content"
          />
        ) : (
          <StatusBar hidden />
        )}
        <Image
          source={require('./src/Images/wizardbackground.png')}
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
            height: '70%',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'column', }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 'normal'
              }}>
              HI, WELCOME TO
            </Text>
            <View>
              <Image
                style={{
                  width: 250,
                  resizeMode: 'center',
                  // alignSelf: 'center',
                }}
                source={require('./src/Images/logo.png')}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: '100',
                marginBottom: 2

              }}>
              WE HELP YOU
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 24,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: 2,
                fontWeight: 'bold'
              }}>
              {CONSTANT.welcomeMain}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 24,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: 2,
                fontWeight: 'bold'
              }}>
              {CONSTANT.welcomeText}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: '100',
                marginTop: 2
              }}>
              YOUR GARMENTS
            </Text>
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: CONSTANT.color,
                borderRadius: 5,
                width: 240,
                height: 50
              }}>
                <Text style={{
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  color: CONSTANT.primaryColor,
                  fontSize: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>Please Login to Proceed</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
class CustomDrawerComponent extends Component {
  state = {
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    permissionChat: '',
    listing_type: '',
    showAlert: false,
  };
  componentWillMount() {
    this.CheckApplicationAccess();
    this.getUser();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ ApplicationAccessServcie: json.access_type.service_access });
    this.setState({ ApplicationAccessJob: json.access_type.job_access });
  };
  getUser = async () => {
    try {
      const permissionChat = await AsyncStorage.getItem('chatPermission');
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
      const listing_type = await AsyncStorage.getItem('listing_type');

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      if (listing_type !== null) {
        this.setState({ listing_type });
      } else {
        //  alert('something wrong')
      }
      if (permissionChat !== null) {
        this.setState({ permissionChat });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  logout = () => {
    const { id, storedValue, storedType, profileImg, type } = this.state;
    axios
      .post(CONSTANT.BaseUrl + 'user/do_logout', {
        user_id: id,
      })
      .then(async response => {
        if (response.data.type == 'success') {
          AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => console.log('success data deleted'));
          this.clearAsyncStorage();
          RNRestart.Restart();
          this.checkAppAccess();
        } else if (response.data.type == 'error') {
          alert('Incorrect Detail');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  canceledLogout = () => { };
  logoutAlert = () => {
    Alert.alert('Confirm', 'Are you sure that you want to logout?', [
      { text: 'Cancel', onPress: () => this.canceledLogout },
      { text: 'Yes', onPress: () => this.logout() },
    ]);
  };
  checkAppAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ data: json });
  };

  openUrl = async (url) => {
    isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url)
    }
    else {
      Alert.alert('No Data Available')
    }
  }

  render() {
    const {
      storedValue,
      storedType,
      profileImg,
      permissionChat,
      showAlert,
      listing_type,
    } = this.state;
    console.log('Chat Permission=', permissionChat, storedType);
    return (
      <SafeAreaView style={{ flex: 1, height: '100%' }}>
        <NavigationEvents onWillFocus={this.getUser} />
        <View style={{
          height: 140,
          marginTop: 'auto',
          marginBottom: 'auto',
          backgroundColor: CONSTANT.statusBarColor,
        }}>
          <View style={{ marginTop: -20 }}>
            <Image
              source={require('./src/Images/logo.png')}
              style={{
                marginLeft: 20,
                width: 160,
              }}
              resizeMode='contain'
            />
          </View>
          <View
            style={{
              marginTop: -15,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            {Platform.OS === 'android' ? (
              <StatusBar
                backgroundColor={CONSTANT.statusBarColor}
                barStyle="light-content"
              />
            ) : (
              <StatusBar hidden />
            )}
            {storedValue != '' ? (
              <Image
                source={{ uri: `${profileImg}` }}
                style={{
                  marginLeft: 20,
                  // marginTop: 65,
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  borderWidth: 0.6,
                  borderColor: CONSTANT.color,
                }}
              />
            ) : (
              <Image
                source={require('./src/Images/guest.png')}
                style={{
                  marginLeft: 20,
                  // marginTop: 65,
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  borderWidth: 0.6,
                  borderColor: CONSTANT.color,
                }}
              />
            )}
            <View
              style={{ marginLeft: 10, marginTop: 0, flexDirection: 'column', width: '50%' }}>
              {storedValue != '' ? (
                <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize', color: CONSTANT.color, textAlign: 'left' }}>{storedValue}</Text>
              ) : (
                <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize', color: CONSTANT.color, textAlign: 'left' }}>{CONSTANT.DrawerGuest}</Text>
              )}
              {/* {storedType != '' ? (
                <Text style={{ fontStyle: 'italic', textTransform: 'capitalize', color: CONSTANT.color }}>{storedType}</Text>
              ) : (
                <Text style={{ fontStyle: 'italic', textTransform: 'capitalize', color: CONSTANT.color }}>{CONSTANT.DrawerGreeting}</Text>
              )} */}
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={{ marginLeft: 5 }}>
            <Text
              style={{
                margin: 10,
                fontWeight: '500',
                fontSize: 18,
                color: '#7a7a7a',
              }}>
              {CONSTANT.DrawerDashboard}
            </Text>
            {storedType == '' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <AntIcon name="login" size={17} color={'#e67e22'} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: '#323232',
                      fontWeight: '300',
                    }}>
                    {CONSTANT.DrawerLogin}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {/* My Profile */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <AntIcon name="user" size={17} color={CONSTANT.primaryColor} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: '#323232',
                    fontWeight: '300',
                  }}>
                  My Profile
                </Text>
              </View>
            </TouchableOpacity>
            {/* My Profile */}
            {storedType != '' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Insight')}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <AntIcon name="barschart" size={17} color={CONSTANT.primaryColor} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: '#323232',
                      fontWeight: '300',
                    }}>
                    {CONSTANT.DrawerInsight}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {storedType != '' && listing_type == 'paid' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Packages')}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <AntIcon name="dropbox" size={17} color={CONSTANT.primaryColor} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: '#323232',
                      fontWeight: '300',
                    }}>
                    {CONSTANT.DrawerPackages}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {storedType != '' && permissionChat === 'allow' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MessagesList')}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <AntIcon name="message1" size={17} color={CONSTANT.primaryColor} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: '#323232',
                      fontWeight: '300',
                    }}>
                    {CONSTANT.DrawerInbox}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SocketChat")}
              >
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <AntIcon name="message1" size={17} color={CONSTANT.primaryColor} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: "#323232",
                      fontWeight: "300",
                    }}
                  >
                     socket chat
                  </Text>
                </View>
              </TouchableOpacity>
             */}
            {storedType != '' &&
              this.state.ApplicationAccessServcie === 'yes' ? (
              <Collapse>
                <CollapseHeader>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#f7f7f7',
                      alignItems: 'center',
                      borderRadius: 5,
                      marginBottom: 5,
                    }}>
                    <AntIcon
                      name="layout"
                      color={CONSTANT.primaryColor}
                      size={20}
                      style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginLeft: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#24355a',
                        paddingLeft: 20,
                        paddingVertical: 20,
                      }}>
                      {CONSTANT.DrawerManageJobs}
                    </Text>
                    <SimpleLineIcons
                      name="arrow-right"
                      color={'#767676'}
                      size={15}
                      style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        right: 10,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{ paddingHorizontal: 20 }}>
                  {storedType != '' && storedType == 'employer' && (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('PostJob')}
                      style={{
                        marginLeft: 30,
                        borderLeftWidth: 1,
                        borderRadius: 0.5,
                        borderStyle: 'dashed',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderLeftColor: '#767676',
                      }}>
                      <Text style={{ color: '#767676' }}>
                        ---- {CONSTANT.DrawerPostJob}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {storedType != '' && storedType == 'employer' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PostedJobs')
                      }
                      style={{
                        marginLeft: 30,
                        borderLeftWidth: 1,
                        borderRadius: 0.5,
                        borderStyle: 'dashed',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderLeftColor: '#767676',
                      }}>
                      <Text style={{ color: '#767676' }}>
                        ---- {CONSTANT.DrawerPostedJobs}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {storedType != '' && storedType == 'freelancer' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('LatestProposals')
                      }
                      style={{
                        marginLeft: 30,
                        borderLeftWidth: 1,
                        borderRadius: 0.5,
                        borderStyle: 'dashed',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderLeftColor: '#767676',
                      }}>
                      <Text style={{ color: '#767676' }}>
                        ---- {CONSTANT.DrawerProposalJobs}
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('OngoingJobs')
                    }
                    style={{
                      marginLeft: 30,
                      borderLeftWidth: 1,
                      borderRadius: 0.5,
                      borderStyle: 'dashed',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderLeftColor: '#767676',
                    }}>
                    <Text style={{ color: '#767676' }}>
                      ---- {CONSTANT.DrawerOngoingJobs}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CompletedServices')
                    }
                    style={{
                      marginLeft: 30,
                      borderLeftWidth: 1,
                      borderRadius: 0.5,
                      borderStyle: 'dashed',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderLeftColor: '#767676',
                    }}>
                    <Text style={{ color: '#767676' }}>
                      ---- {CONSTANT.DrawerCompletedJobs}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CancelledServices')
                    }
                    style={{
                      marginLeft: 30,
                      borderLeftWidth: 1,
                      borderRadius: 0.5,
                      borderStyle: 'dashed',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderLeftColor: '#767676',
                    }}>
                    <Text style={{ color: '#767676' }}>
                      ---- {CONSTANT.DrawerCancelledJobs}
                    </Text>
                  </TouchableOpacity>
                </CollapseBody>
              </Collapse>
            ) : null}

            {storedType === 'freelancer' &&
              this.state.ApplicationAccessServcie === 'yes' ? (
              <Collapse>
                <CollapseHeader>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#f7f7f7',
                      borderRadius: 5,
                      marginBottom: 5,
                    }}>
                    <AntIcon
                      name="customerservice"
                      color={CONSTANT.primaryColor}
                      size={20}
                      style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginLeft: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#24355a',
                        paddingLeft: 20,
                        paddingVertical: 20,
                      }}>
                      {CONSTANT.DrawerManageServices}
                    </Text>
                    <SimpleLineIcons
                      name="arrow-right"
                      color={'#767676'}
                      size={15}
                      style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        right: 10,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{ paddingHorizontal: 20 }}>
                  {storedType != '' && storedType == 'freelancer' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PostService')
                      }
                      style={{
                        marginLeft: 30,
                        borderLeftWidth: 1,
                        borderRadius: 0.5,
                        borderStyle: 'dashed',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderLeftColor: '#767676',
                      }}>
                      <Text style={{ color: '#767676' }}>
                        ---- {CONSTANT.DrawerPostService}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {storedType != '' && storedType == 'freelancer' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PostedServices')
                      }
                      style={{
                        marginLeft: 30,
                        borderLeftWidth: 1,
                        borderRadius: 0.5,
                        borderStyle: 'dashed',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderLeftColor: '#767676',
                      }}>
                      <Text style={{ color: '#767676' }}>
                        ---- {CONSTANT.DrawerPostedServices}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {storedType != '' && storedType == 'freelancer' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('AddonsServices')
                      }
                      style={{
                        marginLeft: 30,
                        borderLeftWidth: 1,
                        borderRadius: 0.5,
                        borderStyle: 'dashed',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderLeftColor: '#767676',
                      }}>
                      <Text style={{ color: '#767676' }}>
                        ---- {CONSTANT.DrawerAddonServices}
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('OngoingServices')
                    }
                    style={{
                      marginLeft: 30,
                      borderLeftWidth: 1,
                      borderRadius: 0.5,
                      borderStyle: 'dashed',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderLeftColor: '#767676',
                    }}>
                    <Text style={{ color: '#767676' }}>
                      ---- {CONSTANT.DrawerOngoingServices}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CompletedServices')
                    }
                    style={{
                      marginLeft: 30,
                      borderLeftWidth: 1,
                      borderRadius: 0.5,
                      borderStyle: 'dashed',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderLeftColor: '#767676',
                    }}>
                    <Text style={{ color: '#767676' }}>
                      ---- {CONSTANT.DrawerCompletedServices}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CancelledServices')
                    }
                    style={{
                      marginLeft: 30,
                      borderLeftWidth: 1,
                      borderRadius: 0.5,
                      borderStyle: 'dashed',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderLeftColor: '#767676',
                    }}>
                    <Text style={{ color: '#767676' }}>
                      ---- {CONSTANT.DrawerCancelledServices}
                    </Text>
                  </TouchableOpacity>
                </CollapseBody>
              </Collapse>
            ) : null}
            {storedType != '' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Favorite')}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <AntIcon name="hearto" size={17} color={CONSTANT.primaryColor} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: '#323232',
                      fontWeight: '300',
                    }}>
                    {CONSTANT.DrawerFavorite}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            {storedType != '' ? (
              <TouchableOpacity
                onPress={() => {
                  this.logoutAlert();
                }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <AntIcon name="logout" size={17} color={CONSTANT.primaryColor} />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 15,
                      color: '#323232',
                      fontWeight: '300',
                    }}>
                    {CONSTANT.DrawerLogout}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <View
              style={{
                borderBottomColor: '#dddddd',
                borderBottomWidth: 0.6,
                marginTop: 10,
                marginBottom: 15,
              }}
            />
            <Text
              style={{
                margin: 10,
                fontWeight: '500',
                fontSize: 18,
                color: '#7a7a7a',
              }}>
              {CONSTANT.DrawerGeneral}
            </Text>
            <TouchableOpacity onPress={() => { this.openUrl('https://trendipeople.com/how-it-works/') }}>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <AntIcon name="profile" size={17} color={CONSTANT.primaryColor} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: '#323232',
                    fontWeight: '300',
                  }}>
                  {CONSTANT.DrawerAboutus}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => { this.openUrl('https://trendipeople.com/') }}
            >
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <AntIcon name="like2" size={17} color={CONSTANT.primaryColor} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: '#323232',
                    fontWeight: '300',
                  }}>
                  {CONSTANT.DrawerRateApp}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => { this.openUrl('https://trendipeople.com/') }}
            >
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <AntIcon name="mail" size={17} color={CONSTANT.primaryColor} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: '#323232',
                    fontWeight: '300',
                  }}>
                  {CONSTANT.DrawerInviteFriends}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => { this.openUrl('https://trendipeople.com/') }}
            >
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <AntIcon name="questioncircleo" size={17} color={CONSTANT.primaryColor} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: '#323232',
                    fontWeight: '300',
                  }}>
                  {CONSTANT.DrawerContact}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
componentDidMount = () => {
  this.CheckApplicationAccess();
};
CheckApplicationAccess = async () => {
  const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
  const json = await response.json();
  this.setState({ data: json });
};


// const TabBar = createBottomTabNavigator(

//   {
//     state = {
//       storedType: '',
//     },
//     componentWillMount() {
//       this.CheckApplicationAccess();
//       this.getUser();
//     },
//     CheckApplicationAccess = async () => {
//       const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
//       const json = await response.json();
//       this.setState({ ApplicationAccessServcie: json.access_type.service_access });
//       this.setState({ ApplicationAccessJob: json.access_type.job_access });
//     },
//     getUser = async () => {
//       try {
//         const storedType = await AsyncStorage.getItem('user_type');
//         //  console.log(storedValue ,storedType, profileImg  ,type , id);
//         if (storedType !== null) {
//           this.setState({ storedType });
//         } else {
//           //  alert('something wrong')
//         }
//       } catch (error) {
//         // alert(error)
//       }
//     },

//     render() {
//       const {
//         storedType,
//       } = this.state;
//       console.log(storedType);
//       return (
//         <SafeAreaView style={{ flex: 1, height: '100%' }}>
//           <NavigationEvents onWillFocus={this.getUser} />
//           {storedType === 'freelancer' ? (
//             <FreelancerTabNavigator />
//           ) : (
//             <DashboardTabNavigator />
//           )}

//         </SafeAreaView>
//       )
//     }
//   }
// );

const FreelancerTabNavigator = createBottomTabNavigator(
  {
    // MainNavigator: MainDrawer},{
    Home: {
      screen: home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="home" color={tintColor} size={30} />
        ),
      },
    },

    Jobs: {
      screen: Jobs,
      navigationOptions: {
        tabBarLabel: 'Jobs',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="laptop" color={tintColor} size={30} />
        ),
      },
    },
    Employers: {
      screen: Employers,
      navigationOptions: {
        tabBarLabel: 'Employers',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="team" color={tintColor} size={30} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="user" color={tintColor} size={30} />
        ),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          headerTitle: routeName,
        };
      }
    },
    tabBarOptions: {
      activeTintColor: CONSTANT.primaryColor,
      inactiveTintColor: CONSTANT.color,
      style: {
        backgroundColor: 'black',
        height: 60,
        paddingBottom: 3,
      }
    },
  },
  {
    headerMode: 'none',
  },
);
const DashboardTabNavigator = createBottomTabNavigator(
  {
    // MainNavigator: MainDrawer},{
    Home: {
      screen: home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="home" color={tintColor} size={30} />
        ),
      },
    },

    Jobs: {
      screen: Jobs,
      navigationOptions: {
        tabBarLabel: 'Jobs',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="laptop" color={tintColor} size={30} />
        ),
      },
    },

    Freelancers: {
      screen: Freelancers,
      navigationOptions: {
        tabBarLabel: 'Freelancers',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="profile" color={tintColor} size={30} />
        ),
      },
    },

    Employers: {
      screen: Employers,
      navigationOptions: {
        tabBarLabel: 'Employers',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="team" color={tintColor} size={30} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <AntIcon name="user" color={tintColor} size={30} />
        ),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          headerTitle: routeName,
        };
      }
    },
    tabBarOptions: {
      activeTintColor: CONSTANT.primaryColor,
      inactiveTintColor: CONSTANT.color,
      style: {
        backgroundColor: 'black',
        height: 60,
        paddingBottom: 3,
      }
    },
  },
  {
    headerMode: 'none',
  },
);

// const Screens = (storedType = AsyncStorage.getItem('user_type')) => {
//   return createSwitchNavigator(
//     {
//       FreelancerTabNavigator: { screen: FreelancerTabNavigator },
//       DashboardTabNavigator: { screen: DashboardTabNavigator }
//     },

//     { initialRouteName: storedType === 'freelancer' ? "FreelancerTabNavigator" : "DashboardTabNavigator" });
// }


const DashboardStackNavigator = createStackNavigator(
  {
    // Screens: Screens,
    // FreelancerTabNavigator: FreelancerTabNavigator,
    Container: Container,
    DashboardTabNavigator: DashboardTabNavigator,
    Profile: Profile,
    Employers: Employers,
    Jobs: Jobs,
    FreelancerCategory: FreelancerCategory,
    DetailFreelancerScreen: DetailFreelancerScreen,
    DetailJobScreen: DetailJobScreen,
    DetailCompanyScreen: DetailCompanyScreen,
    SearchScreen: SearchScreen,
    EmployerLayout: EmployerLayout,
    // LoginScreen: LoginScreen,
    PostJob: PostJob,
    PostService: PostService,
    SendOffer: SendOffer,
    CustomHeader: CustomHeader,
    PreLoader: PreLoader,
    Favorite: Favorite,
    SendProposal: SendProposal,
    SearchResultFreelancer: SearchResultFreelancer,
    SearchResultEmployer: SearchResultEmployer,
    SearchResultJob: SearchResultJob,
    SearchResultService: SearchResultService,
    // Signup: Signup,
    JobbyCategorylist: JobbyCategorylist,
    SendReport: SendReport,
    HomeCategories: HomeCategories,
    CustomDrawerComponent: CustomDrawerComponent,
    // ForgetPassword: ForgetPassword,
    DetailServiceScreen: DetailServiceScreen,
    VerificationAccount: VerificationAccount,
    BuyServiceScreen: BuyServiceScreen,
    BuyServiceWebview: BuyServiceWebview,
    MessagesList: MessagesList,
    MessageSingleListCard: MessageSingleListCard,
    DetailMessageScreen: DetailMessageScreen,
    SocketChat: SocketChat,
    Insightstar: Insightstar,
    Insight: Insight,
    Packages: Packages,
    LatestProposals: LatestProposals,
    DetailOngoing: DetailOngoing,
    PostedServices: PostedServices,
    CompletedServices: CompletedServices,
    CompleteServicesDetail: CompleteServicesDetail,
    OngoingServices: OngoingServices,
    OngoingServicesDetail: OngoingServicesDetail,
    AddonsServices: AddonsServices,
    CancelledServices: CancelledServices,
    OngoingJobs: OngoingJobs,
    PostedJobs: PostedJobs,
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    transitionConfig: TransitionConfiguration,
  },
);
const AppDrawerNavigator = createDrawerNavigator(
  {
    // Container: { screen: Container },
    // Container: Container,
    Dash: { screen: DashboardStackNavigator },
    Login: LoginScreen,
    PostJOb: PostJob,
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    transitionConfig: TransitionConfiguration,
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: CONSTANT.primaryColor,
    },
  },
);
const AppSwitchNavigator = createSwitchNavigator(
  {
    PreLoader: { screen: PreLoader },
    Welcome: { screen: WelcomeScreen },
    LoginScreen: { screen: LoginScreen },
    Signup: { screen: Signup },
    ForgetPassword: { screen: ForgetPassword },
    Dashboard: { screen: AppDrawerNavigator },
  },
  {
    headerMode: 'none',
    initialRouteName: 'PreLoader',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    transitionConfig: TransitionConfiguration,
  },
);
const AppContainer = createAppContainer(AppSwitchNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
