import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  FlatList,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
  ViewBase,
  Dimensions,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import {CalloutSubview} from 'react-native-maps';
import axios from 'axios';
import home from '../Home/home';
import CustomHeader from '../Header/CustomHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Insightstar from './Insightstar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HTML from 'react-native-render-html';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as CONSTANT from '../Constants/Constant';
import CountDown from 'react-native-countdown-component';
import {Table, Row, Rows} from 'react-native-table-component';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
class Insight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isProgress: false,
      fetchDashboardData: '',
      fetchDashboardPackage: [],
      fetchDashboardOngoingJob: [],
      storedValue: '',
      storedType: '',
      profileImg: '',
      type: '',
      id: '',
      permissionChat: '',
      showAlert: false,
      tableHead: ['Project Title', 'Date', 'Earnings'],
      tableData: [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']],
      fetchEarningsData: [],
    };
  }
  componentWillMount() {
    this.CheckApplicationAccess();
    this.getDashboardData();
    this.fetchOngoingJobs();
    this.fetchEarningData();
    this.getUser();
  }
  toDateTime = () => {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt('2070-01-23'));
    var date = epoch.toISOString();
    date = date.replace('T', ' ');
    var t =
      date.split('.')[0].split(' ')[0] +
      ' ' +
      epoch.toLocaleTimeString().split(' ')[0];
    return t;
  };
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ApplicationAccessServcie: json.access_type.service_access});
    this.setState({ApplicationAccessJob: json.access_type.job_access});
  };
  fetchEarningData = async () => {
    const Pid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl + 'dashboard/get_my_earnings?user_id=' + Pid,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchEarningsData: '', isLoading: false}); // empty data set
    } else {
      this.setState({fetchEarningsData: json, isLoading: false});
    }
  };
  fetchOngoingJobs = async () => {
    const Pid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl + 'dashboard/get_ongoing_jobs?user_id=' + Pid,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchDashboardData: '', isLoading: false}); // empty data set
    } else {
      this.setState({fetchDashboardOngoingJob: json, isLoading: false});
    }
  };
  getDashboardData = async () => {
    const User_Type = await AsyncStorage.getItem('user_type');
    if (User_Type == 'freelancer') {
      const Pid = await AsyncStorage.getItem('projectUid');
      const response = await fetch(
        CONSTANT.BaseUrl + 'dashboard/get_freelancer_insights?user_id=' + Pid,
      );
      const json = await response.json();
      if (
        Array.isArray(json) &&
        json[0] &&
        json[0].type &&
        json[0].type === 'error'
      ) {
        this.setState({fetchDashboardData: '', isLoading: false}); // empty data set
      } else {
        this.setState({fetchDashboardData: json, isLoading: false});
        this.setState({fetchDashboardPackage: json.packages, isLoading: false});
      }
    } else if (User_Type == 'employer') {
      const Pid = await AsyncStorage.getItem('projectUid');
      const response = await fetch(
        CONSTANT.BaseUrl + 'dashboard/get_employer_insights?user_id=' + Pid,
      );
      const json = await response.json();
      if (
        Array.isArray(json) &&
        json[0] &&
        json[0].type &&
        json[0].type === 'error'
      ) {
        this.setState({fetchDashboardData: '', isLoading: false}); // empty data set
      } else {
        this.setState({fetchDashboardData: json, isLoading: false});
        this.setState({fetchDashboardPackage: json.packages, isLoading: false});
      }
    } else {
      Alert.alert('Oops', 'No User Type Found');
    }
  };
  getUser = async () => {
    try {
      const permissionChat = await AsyncStorage.getItem('chatPermission');
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({storedValue});
      } else {
        // alert('something wrong')
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
      if (id !== null) {
        this.setState({id});
      } else {
        //  alert('something wrong')
      }
      if (permissionChat !== null) {
        this.setState({permissionChat});
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
  render() {
    const {
      storedValue,
      storedType,
      profileImg,
      permissionChat,
      showAlert,
    } = this.state;
    return this.state.isProgress ? (
      <CustomProgressBar />
    ) : (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: '100%',
            backgroundColor: CONSTANT.statusBarColor,
            flexDirection: 'row',
            shadowOffset: {width: 0, height: 2},
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 10,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{
              flexDirection: 'column',
              width: '20%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <AntIcon name="back" size={25} color={'#fff'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              width: '60%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignSelf: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#fff',
                  height: 30,
                  marginTop: 9,
                }}>
                {CONSTANT.InsightHeaderTitle}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={{padding: 10}}>
          {this.state.fetchDashboardOngoingJob.length >= 1 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  Ongoing Projects:
                </Text>
                <Text>Show All</Text>
              </View>

              <FlatList
                data={this.state.fetchDashboardOngoingJob}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('DetailOngoing', {
                        ID: item.ID,
                        title: item.title,
                        level: item.project_level,
                        location_name: item.location_name,
                        location_flag: item.location_flag,
                        employer_name: item.employer_name,
                        employer_verified: item.employer_verified,
                      })
                    }
                    activeOpacity={0.7}
                    style={{marginHorizontal: 10, marginBottom: 30, top: 10}}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        shadowOffset: {width: 0, height: 2},
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        elevation: 6,
                      }}>
                      <View
                        style={{
                          margin: 10,
                          borderRadius: 6,
                          backgroundColor: '#d7f3ff',
                          height: 130,
                          overflow: 'hidden',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode={'contain'}
                          style={{width: 140, marginTop: -15}}
                          source={require('../Images/demo.png')}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontWeight: '700',
                          fontSize: 16,
                          marginHorizontal: 10,
                          marginTop: 10,
                          color: '#323232',
                        }}>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginHorizontal: 10,
                          marginTop: 5,
                        }}>
                        {item.employer_verified == 'yes' && (
                          <AntIcon
                            name="checkcircle"
                            size={12}
                            color={'#00cc67'}
                          />
                        )}

                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 14,
                            marginHorizontal: 10,
                            color: '#676767',
                            fontWeight: '700',
                          }}>
                          {item.employer_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginLeft: 10,
                          top: 5,
                          marginBottom: 20,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <AntIcon name="folder1" size={12} color={'#47C3EE'} />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              marginHorizontal: 10,
                              color: '#676767',
                            }}>
                            {item.project_level}
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <AntIcon
                            name="flag"
                            size={12}
                            color={CONSTANT.primaryColor}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              marginHorizontal: 10,
                              color: '#676767',
                            }}>
                            {item.location_name}
                          </Text>
                        </View>

                        {/* <View style={{flexDirection:'row'}}>
                                    <AntIcon name="checkcircle" size={12} color={"#00cc67"} /> 
                                    <Text numberOfLines={1} style={{ fontSize:14 , marginHorizontal:10  , color:'#676767'}}>{item.employer_name}</Text>
                                    </View> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                horizontal={true}
              />
            </View>
          )}
          {this.state.fetchEarningsData.length >= 1 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  Past Earnings:
                </Text>
              </View>

              <FlatList
                data={this.state.fetchEarningsData}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{marginHorizontal: 10, marginBottom: 30, top: 10}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        shadowOffset: {width: 0, height: 2},
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        elevation: 6,
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 15,
                          textTransform: 'capitalize',
                        }}>
                        {item.project_title}
                      </Text>
                      <Text style={{fontSize: 13}}>
                        {entities.decode(item.amount)}
                      </Text>
                      <Text style={{fontSize: 13, color: '#767676'}}>
                        {item.timestamp}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                horizontal={true}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'black',
              borderRadius: 4,
              padding: 20,
            }}>
            <View>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
                New Messages
              </Text>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
                {entities.decode(this.state.fetchDashboardData.unread_messages)}{' '}
                Messages Found
              </Text>
            </View>
            <View style={styles.ButtonContainer}>
              <Button
                onPress={() => this.props.navigation.navigate('MessagesList')}
                title="Click to View"
                color={CONSTANT.primaryColor}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.insightgrid}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LatestProposals')}
              activeOpacity={0.7}
              style={styles.insightdetails}>
              <Text style={styles.insighttitle}>Latest Proposals</Text>
              <Text style={styles.insightinfo}>Click To View</Text>
              <View style={{}} style={styles.insighticon}>
                {/* <MatIcon
                  name="bookmark-multiple-outline"
                  size={40}
                  color="#fff"
                /> */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Favorite')}
              activeOpacity={0.7}
              style={[styles.insightdetails, styles.styleinavailable]}>
              <Text style={styles.insighttitle}>View Saved Items</Text>
              <Text style={styles.insightinfo}>Click To View</Text>
              <View style={styles.insighticon}>
                {/* <MatIcon name="star-outline" size={40} color="#fff" /> */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.insightdetails, styles.styleOngoingProject]}>
              <Text style={styles.insighttitlebalance}>
                {entities.decode(
                  this.state.fetchDashboardData.available_balance,
                )}
              </Text>
              <Text style={styles.insightinfo}>Available Balance</Text>
              <View style={{}} style={styles.insighticon}>
                {/* <MatIcon
                  name="bookmark-multiple-outline"
                  size={40}
                  color="#fff"
                /> */}
              </View>
            </TouchableOpacity>
            {storedType == 'freelancer' ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleinpending]}>
                <Text style={styles.insighttitlebalance}>
                  {entities.decode(
                    this.state.fetchDashboardData.pending_balance,
                  )}
                </Text>
                <Text style={styles.insightinfo}>Pending Balance</Text>
                <View style={styles.insighticon}>
                  {/* <MatIcon name="block-helper" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleinpending]}>
                <Text style={styles.insighttitlebalance}>
                  {this.state.fetchDashboardData.total_cancelled_jobs}
                </Text>
                <Text style={styles.insightinfo}>Total Cancelled Projects</Text>
                <View style={styles.insighticon}>
                  {/* <MatIcon name="block-helper" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            )}

            {this.state.ApplicationAccessJob === 'yes' &&
            storedType == 'freelancer' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OngoingJobs')}
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleincompletedProject]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.ongoing_jobs}
                </Text>
                <Text style={styles.insightinfo}>Total Ongoing Projects</Text>
                <View style={[styles.insighticon]}>
                  {/* <FontAwesome5 name="envelope" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleincompletedProject]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_ongoing_jobs}
                </Text>
                <Text style={styles.insightinfo}>Total Ongoing Projects</Text>
                <View style={[styles.insighticon]}>
                  {/* <FontAwesome5 name="envelope" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            )}
            {this.state.ApplicationAccessJob === 'yes' &&
            storedType == 'freelancer' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('')}
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleOngoingService]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.completed_jobs}
                </Text>
                <Text style={styles.insightinfo}>Total Completed Projects</Text>
                <View style={styles.insighticon}>
                  {/* <MatIcon name="star-outline" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleOngoingService]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_completed_jobs}
                </Text>
                <Text style={styles.insightinfo}>Total Completed Projects</Text>
                <View style={styles.insighticon}>
                  {/* <MatIcon name="star-outline" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            )}

            {this.state.ApplicationAccessServcie === 'yes' &&
            storedType == 'freelancer' ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('OngoingServices')
                }
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleincompletedService]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.ongoing_services}
                </Text>
                <Text style={styles.insightinfo}>Total Ongoing Services</Text>
                <View style={styles.insighticon}>
                  {/* <MatIcon name="block-helper" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('OngoingServices')
                }
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleincompletedService]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_ongoing_services}
                </Text>
                <Text style={styles.insightinfo}>Total Ongoing Services</Text>
                <View style={styles.insighticon}>
                  {/* <MatIcon name="block-helper" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            )}
            {this.state.ApplicationAccessServcie === 'yes' && (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CompletedServices')
                }
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleincancelledService]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_completed_services}
                </Text>
                <Text style={styles.insightinfo}>Total Completed Services</Text>
                <View style={{}} style={styles.insighticon}>
                  {/* <MatIcon
                    name="bookmark-multiple-outline"
                    size={40}
                    color="#fff"
                  /> */}
                </View>
              </TouchableOpacity>
            )}
            {this.state.ApplicationAccessServcie === 'yes' &&
            storedType == 'freelancer' ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleinbox]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_completed_services}
                </Text>
                <Text style={styles.insightinfo}>Total Soled Services</Text>
                <View style={[styles.insighticon]}>
                  {/* <FontAwesome5 name="envelope" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleinbox]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_posted_jobs}
                </Text>
                <Text style={styles.insightinfo}>Total Posted Projects</Text>
                <View style={[styles.insighticon]}>
                  {/* <FontAwesome5 name="envelope" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            )}
            {this.state.ApplicationAccessServcie === 'yes' && (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CancelledServices')
                }
                activeOpacity={0.7}
                style={[styles.insightdetails, styles.styleinsoldService]}>
                <Text style={styles.insighttitle}>
                  {this.state.fetchDashboardData.total_cancelled_services}
                </Text>
                <Text style={styles.insightinfo}>Total Cancelled Services</Text>
                <View style={[styles.insighticon]}>
                  {/* <FontAwesome5 name="envelope" size={40} color="#fff" /> */}
                </View>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Packages')}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              marginBottom: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'black',
              borderRadius: 4,
              padding: 20,
            }}>
            <View>
              <CountDown
                style={{marginLeft: -15, marginBottom: -10}}
                size={15}
                until={1000000}
                onFinish={() => alert('Finished')}
                digitStyle={{}}
                digitTxtStyle={{color: '#fff'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#fff'}}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
                Check Package Expiry
              </Text>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
                Upgrade Now
              </Text>
            </View>
            <View style={styles.ButtonContainer}>
              <Button
                onPress={() => this.RBSheet.open()}
                title="View More"
                color={CONSTANT.primaryColor}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: 'transparent',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.getAnswersRBSheetMainArea}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                height: 55,
                justifyContent: 'center',
                fontWeight: '700',
              }}>
              <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                Package Title
              </Text>
            </View>
            <View style={styles.getAnswersRBSheetSpecialityArea}>
              <CountDown
                style={{marginTop: 15, marginBottom: 15}}
                size={20}
                until={1000000}
                onFinish={() => alert('Finished')}
                digitStyle={{
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: CONSTANT.primaryColor,
                }}
                digitTxtStyle={{color: CONSTANT.primaryColor}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: CONSTANT.primaryColor}}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
              <FlatList
                data={this.state.fetchDashboardPackage}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{justifyContent: 'space-between'}}
                    activeOpacity={0.9}>
                    {index % 2 === 0 ? (
                      <View style={styles.amenetiesarea}>
                        <Text style={styles.amenetiestext}>{item.title}</Text>
                        <HTML
                          containerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          html={item.value}
                          imagesMaxWidth={Dimensions.get('window').width}
                        />
                      </View>
                    ) : (
                      <View style={styles.amenetiesarea2}>
                        <Text style={styles.amenetiestext}>{item.title}</Text>
                        <HTML
                          containerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          html={item.value}
                          imagesMaxWidth={Dimensions.get('window').width}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}

export default Insight;
const styles = StyleSheet.create({
  container: {
    height: '77%',
    marginBottom: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Insightcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Insightmember: {
    position: 'relative',
    backgroundColor: CONSTANT.primaryColor,
    flexDirection: 'column',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  amenetiestext: {
    fontSize: 14,
    color: '#484848',
    paddingLeft: 20,
    paddingVertical: 20,
    textTransform: 'capitalize',
  },
  amenetiesarea: {
    flexDirection: 'row',
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  amenetiesarea2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  Insightimg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
    marginBottom: 5,
  },
  Insighttitle: {
    fontSize: 15,
    marginTop: 5,
    color: '#24355a',
    fontWeight: '700',
  },
  editicon: {
    position: 'absolute',
    right: -17,
    top: -16,
    backgroundColor: CONSTANT.primaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderTopStartRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Insightreview: {
    color: '#767676',
    fontWeight: '400',
    fontSize: 12,
  },
  pictureicon: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: CONSTANT.primaryColor,
    padding: 3,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 1,
  },
  starrating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  insightdetails: {
    position: 'relative',
    backgroundColor: CONSTANT.primaryColor,
    paddingVertical: 30,
    marginBottom: 5,
    borderRadius: 5,
    width: '49.3%',
  },
  insightgrid: {
    flexDirection: 'row',
    paddingVertical: 5,
    margin: 5,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
  },
  insighttitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  insighttitlebalance: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  insightinfo: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  insighticon: {
    opacity: 0.3,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    bottom: -15,
  },
  styleinbox: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleinavailable: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleinpending: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleOngoingProject: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleincompletedProject: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleOngoingService: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleincompletedService: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleincancelledService: {
    backgroundColor: CONSTANT.primaryColor,
  },
  styleinsoldService: {
    backgroundColor: CONSTANT.primaryColor,
  },
  stylesoledservice: {
    backgroundColor: CONSTANT.primaryColor,
  },
  ButtonContainer: {
    paddingVertical: 10,
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  getAnswersRBSheetMainArea: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  getAnswersRBSheetSpecialityArea: {
    height: 500,
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
